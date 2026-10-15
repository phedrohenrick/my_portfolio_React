import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { TechLogo } from "../../data/about";

// Tamanho de cada bloco em células da grade (célula = 52px).
const spans = {
  1: "col-span-1 row-span-1 p-2.5",
  2: "col-span-2 row-span-2 p-5",
  3: "col-span-3 row-span-3 p-7",
};

const tints = ["bg-white", "bg-seaglass-soft", "bg-white", "bg-tide-soft", "bg-white", "bg-lagoon-soft", "bg-seafoam-soft"];

const CELL = 52;
const GAP = 8;
const blockPx = (size: TechLogo["size"]) => size * CELL + (size - 1) * GAP;

// Efeito "lupa": o bloco sob o mouse cresce e os vizinhos encolhem conforme a distância.
// Blocos menores que o do React (size 2) crescem até o tamanho dele; os demais crescem HOVER_SCALE.
const FOCUS_PX = blockPx(2);
const HOVER_SCALE = 1.22;
const MAX_SHRINK = 0.2;
const RADIUS = 200;

const hoverScale = (size: TechLogo["size"]) => (blockPx(size) < FOCUS_PX ? FOCUS_PX / blockPx(size) : HOVER_SCALE);

// Desktop: grade densa com blocos de tamanhos diferentes, juntinhos como numa nuvem de palavras.
const DesktopCloud = ({ items }: { items: TechLogo[] }) => {
  const reduce = useReducedMotion();
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [scales, setScales] = useState<number[] | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const focus = (index: number) => {
    if (reduce) return;
    const center = (el: HTMLLIElement | null) => {
      const r = el?.getBoundingClientRect();
      return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: 0, y: 0 };
    };
    const origin = center(itemRefs.current[index]);
    setActive(index);
    setScales(
      items.map((_, i) => {
        if (i === index) return hoverScale(items[i].size);
        const c = center(itemRefs.current[i]);
        const dist = Math.hypot(c.x - origin.x, c.y - origin.y);
        return 1 - MAX_SHRINK * Math.max(0, 1 - dist / RADIUS);
      }),
    );
  };

  const reset = () => {
    setActive(null);
    setScales(null);
  };

  return (
    <ul
      onMouseLeave={reset}
      className="grid grid-flow-dense auto-rows-[52px] grid-cols-[repeat(auto-fill,52px)] justify-center gap-2"
    >
      {items.map((item, i) => (
        <motion.li
          key={item.name}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          title={item.name}
          onMouseEnter={() => focus(i)}
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1 }}
          animate={{ scale: scales?.[i] ?? 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            opacity: { duration: 0.35, delay: reduce ? 0 : i * 0.04 },
            scale: { type: "spring", stiffness: 300, damping: 22 },
          }}
          className={`relative flex items-center justify-center rounded-2xl border border-line ${tints[i % tints.length]} ${spans[item.size]} ${
            active === i ? "z-10 shadow-lg" : "z-0"
          }`}
        >
          <img src={item.logo} alt={item.name} loading="lazy" draggable={false} className="h-full w-full object-contain" />
        </motion.li>
      ))}
    </ul>
  );
};

// Mobile: nuvem redonda no estilo da tela de apps do Apple Watch.
// Ícones circulares em favo de mel; arrasta em qualquer direção e volta ao centro ao soltar.
// Perto do centro os ícones ficam maiores; nas bordas encolhem e se aproximam do centro.
const BUBBLE = 58;
const SPACING = 82;
const CENTER_SCALE = 1.45;
const EDGE_SCALE = 0.55;
const FALLOFF = 150;

const HEX_DIRS = [
  [1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1],
];

const hexRing = (ring: number) => {
  const cells: [number, number][] = [];
  let q = -ring;
  let r = ring;
  for (const [dq, dr] of HEX_DIRS) {
    for (let step = 0; step < ring; step++) {
      cells.push([q, r]);
      q += dq;
      r += dr;
    }
  }
  return cells;
};

// Posições em favo de mel: centro, anel 1 (6), anel 2 (12)...
// O último anel, se incompleto, recebe os ícones espaçados por igual em volta, e o conjunto
// é recentralizado pelo centro de massa, para a nuvem não pender para um lado.
const hexLayout = (count: number) => {
  const cells: [number, number][] = [[0, 0]];
  for (let ring = 1; cells.length < count; ring++) {
    const slots = hexRing(ring);
    const needed = count - cells.length;
    if (needed >= slots.length) {
      cells.push(...slots);
    } else {
      for (let k = 0; k < needed; k++) cells.push(slots[Math.floor((k * slots.length) / needed)]);
    }
  }
  const points = cells.map(([q, r]) => ({ x: SPACING * (q + r / 2), y: SPACING * r * (Math.sqrt(3) / 2) }));
  const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
  const cy = points.reduce((s, p) => s + p.y, 0) / points.length;
  return points.map((p) => ({ x: p.x - cx, y: p.y - cy }));
};

type BubbleProps = { item: TechLogo; home: { x: number; y: number }; panX: MotionValue<number>; panY: MotionValue<number>; tint: string; flat: boolean };

const Bubble = ({ item, home, panX, panY, tint, flat }: BubbleProps) => {
  const t = useTransform([panX, panY], ([px, py]: number[]) => Math.min(1, Math.hypot(home.x + px, home.y + py) / FALLOFF));
  const scale = useTransform(t, (v) => (flat ? 1 : CENTER_SCALE - (CENTER_SCALE - EDGE_SCALE) * v * v));
  const pull = (v: number) => (flat ? 1 : 1 - 0.1 * v);
  const x = useTransform([panX, panY, t], ([px, , v]: number[]) => (home.x + px) * pull(v));
  const y = useTransform([panX, panY, t], ([, py, v]: number[]) => (home.y + py) * pull(v));
  const opacity = useTransform(t, (v) => (flat ? 1 : 1 - 0.35 * v));

  return (
    <motion.li
      title={item.name}
      style={{ x, y, scale, opacity, width: BUBBLE, height: BUBBLE, marginLeft: -BUBBLE / 2, marginTop: -BUBBLE / 2 }}
      className={`absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border border-line p-3 shadow-sm ${tint}`}
    >
      <img src={item.logo} alt={item.name} loading="lazy" draggable={false} className="h-full w-full object-contain" />
    </motion.li>
  );
};

const MobileCloud = ({ items }: { items: TechLogo[] }) => {
  const reduce = useReducedMotion() ?? false;
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  // Os mais importantes (size maior) ficam no centro.
  const ordered = [...items].sort((a, b) => b.size - a.size);
  const homes = hexLayout(ordered.length);

  return (
    <div className="relative -mx-4 h-[340px] overflow-hidden">
      <ul aria-label="Tecnologias" className="absolute inset-0">
        {ordered.map((item, i) => (
          <Bubble key={item.name} item={item} home={homes[i]} panX={panX} panY={panY} tint={tints[i % tints.length]} flat={reduce} />
        ))}
      </ul>
      {/* Camada invisível que captura o arraste em qualquer direção e volta à origem com mola ao soltar. */}
      <motion.div
        aria-hidden="true"
        drag
        dragSnapToOrigin
        dragElastic={0.35}
        dragConstraints={{ left: -160, right: 160, top: -130, bottom: 130 }}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 22 }}
        style={{ x: panX, y: panY }}
        className="absolute inset-0 z-10 cursor-grab touch-none active:cursor-grabbing"
      />
    </div>
  );
};

const useIsDesktop = () => {
  const query = "(min-width: 768px)";
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return matches;
};

const TechCloud = ({ items }: { items: TechLogo[] }) =>
  useIsDesktop() ? <DesktopCloud items={items} /> : <MobileCloud items={items} />;

export default TechCloud;
