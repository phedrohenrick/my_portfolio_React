import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
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

// Grade densa com blocos de tamanhos diferentes: as peças se encaixam juntinhas, como numa nuvem de palavras.
const TechCloud = ({ items }: { items: TechLogo[] }) => {
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

export default TechCloud;
