import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import oceanSvg from "../../assets/images/AnimatedBackground/AnimatedBackground.svg?raw";

// Ondas do hero desenhadas em canvas a partir do próprio AnimatedBackground.svg:
// mesmas formas (cristas e vales), cores e animação. Por cima disso entra a interação.
// O SVG é aplicado como "cover", centralizado na horizontal e alinhado embaixo.
const VIEW_W = 1366;
const VIEW_H = 633;

// Física da superfície: cada coluna é uma mola ligada às vizinhas.
const COLUMN_PX = 8;
const STIFFNESS = 0.025;
const DAMPING = 0.025;
const SPREAD = 0.24;
const SPREAD_PASSES = 4;

// Interação.
const HOVER_FORCE = 0.55; // empurrão do mouse, proporcional à velocidade do cursor
const TAP_IMPULSE = 9; // marola do toque/clique
const BRUSH_COLUMNS = 4; // raio (em colunas) da área afetada
const ZONE_ABOVE_PX = 90; // a interação começa um pouco acima da primeira onda
const MAX_OFFSET_PX = 60;

const NUM_RE = /-?\d*\.?\d+(?:e-?\d+)?/g;

type Layer = {
  color: string;
  parts: string[]; // texto do path entre os números
  a: number[]; // forma 1
  b: number[]; // forma 2 (a animação vai a → b → a)
  dur: number;
  shiftBegin: number; // atraso do deslizamento lateral, em segundos
  shift: number; // deslocamento lateral máximo, em unidades do viewBox
  top: number; // linha de base aproximada, para a zona de interação
};

// Lê as camadas do SVG: cada <path> tem um <animate> de "d" e um <animateTransform> de translate.
const parseLayers = (svg: string): Layer[] => {
  const re = /<path[^>]*fill="(#[0-9a-fA-F]+)"[^>]*>\s*<animate([^>]*)>[\s\S]*?<animateTransform([^>]*)>/g;
  const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "";
  const layers: Layer[] = [];
  for (const m of svg.matchAll(re)) {
    const frames = attr(m[2], "values").split(";");
    const nums = (d: string) => (d.match(NUM_RE) ?? []).map(Number);
    const a = nums(frames[0]);
    const shiftValues = attr(m[3], "values").split(";").map(Number);
    layers.push({
      color: m[1],
      parts: frames[0].replace(NUM_RE, "\u0000").split("\u0000"),
      a,
      b: nums(frames[1] ?? frames[0]),
      dur: parseFloat(attr(m[2], "dur")) || 10,
      shiftBegin: parseFloat(attr(m[3], "begin")) || 0,
      shift: Math.max(...shiftValues, 0),
      top: a[1] ?? 400,
    });
  }
  return layers;
};

const LAYERS = parseLayers(oceanSvg);

// cubic-bezier(0.3, 0, 0.7, 1), o mesmo keySplines do SVG.
const ease = (x: number) => {
  let t = x;
  for (let i = 0; i < 6; i++) {
    const bx = 3 * (1 - t) * (1 - t) * t * 0.3 + 3 * (1 - t) * t * t * 0.7 + t * t * t;
    const dx = 3 * (1 - t) * (1 - t) * 0.3 + 6 * (1 - t) * t * (0.7 - 0.3) + 3 * t * t * (1 - 0.7);
    if (Math.abs(dx) < 1e-6) break;
    t -= (bx - x) / dx;
  }
  return 3 * (1 - t) * t * t + t * t * t;
};

// Camadas da frente reagem mais que as do fundo, para dar profundidade.
const layerWeight = (i: number) => 0.25 + (0.75 * i) / Math.max(1, LAYERS.length - 1);

type Surface = { h: Float32Array; v: Float32Array };

const OceanWaves = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || LAYERS.length === 0) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let columns = 0;
    let surfaces: Surface[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      scale = Math.max(width / VIEW_W, height / VIEW_H);
      offsetX = (width - VIEW_W * scale) / 2;
      offsetY = height - VIEW_H * scale;
      columns = Math.ceil(width / COLUMN_PX) + 1;
      surfaces = LAYERS.map(() => ({ h: new Float32Array(columns), v: new Float32Array(columns) }));
    };

    // Deslocamento da física (px) numa posição x da tela, interpolando entre colunas.
    const offsetAt = (h: Float32Array, x: number) => {
      const p = x / COLUMN_PX;
      const c = Math.floor(p);
      if (c < 0) return h[0];
      if (c >= columns - 1) return h[columns - 1];
      return h[c] + (h[c + 1] - h[c]) * (p - c);
    };

    const draw = (t: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      LAYERS.forEach((layer, i) => {
        // Forma: a → b → a ao longo de "dur" (linear, como no SVG).
        const phase = (t % layer.dur) / layer.dur;
        const k = phase < 0.5 ? phase * 2 : 2 - phase * 2;
        // Deslizamento lateral 0 → shift → 0 com easing e atraso por camada.
        const sp = (((t - layer.shiftBegin) % layer.dur) + layer.dur) % layer.dur / layer.dur;
        const tx = layer.shift * (sp < 0.5 ? ease(sp * 2) : 1 - ease(sp * 2 - 1));

        const { h } = surfaces[i];
        let d = layer.parts[0];
        for (let n = 0; n < layer.a.length; n++) {
          let value = layer.a[n] + (layer.b[n] - layer.a[n]) * k;
          // Coordenadas y da superfície (não as do fechamento embaixo) recebem a física.
          if (n % 2 === 1 && value < VIEW_H - 1) {
            const x = layer.a[n - 1] + (layer.b[n - 1] - layer.a[n - 1]) * k;
            value += offsetAt(h, offsetX + (x + tx) * scale) / scale;
          }
          d += value.toFixed(2) + layer.parts[n + 1];
        }
        ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * (offsetX + tx * scale), dpr * offsetY);
        ctx.fillStyle = layer.color;
        ctx.fill(new Path2D(d));
      });
    };

    const step = () => {
      for (const { h, v } of surfaces) {
        for (let c = 0; c < columns; c++) {
          v[c] += -STIFFNESS * h[c] - DAMPING * v[c];
          h[c] = Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, h[c] + v[c]));
        }
        for (let pass = 0; pass < SPREAD_PASSES; pass++) {
          for (let c = 1; c < columns; c++) {
            const d = SPREAD * (h[c] - h[c - 1]);
            v[c - 1] += d;
            v[c] -= d;
          }
        }
      }
    };

    // Empurra a superfície para cima (y negativo) em torno de x, com queda suave nas bordas.
    const push = (x: number, strength: number) => {
      const center = Math.round(x / COLUMN_PX);
      surfaces.forEach(({ v }, i) => {
        const w = layerWeight(i) * strength;
        for (let k = -BRUSH_COLUMNS; k <= BRUSH_COLUMNS; k++) {
          const c = center + k;
          if (c < 0 || c >= columns) continue;
          const falloff = Math.cos((k / (BRUSH_COLUMNS + 1)) * (Math.PI / 2));
          v[c] -= w * falloff * falloff;
        }
      });
    };

    // Proximidade do ponteiro com as ondas: 0 longe acima, 1 sobre elas.
    const proximity = (y: number) => {
      const top = offsetY + Math.min(...LAYERS.map((l) => l.top)) * scale;
      if (y >= top) return 1;
      return Math.max(0, 1 - (top - y) / ZONE_ABOVE_PX);
    };

    resize();

    if (reduce) {
      draw(0);
      const ro = new ResizeObserver(() => {
        resize();
        draw(0);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let lastX: number | null = null;

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onPointerMove = (e: PointerEvent) => {
      const { x, y } = local(e);
      if (x < 0 || x > width || y > height) {
        lastX = null;
        return;
      }
      const near = proximity(y);
      if (near > 0 && lastX !== null) {
        const speed = Math.min(1, Math.abs(x - lastX) / 20);
        push(x, HOVER_FORCE * speed * near);
      }
      lastX = x;
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = local(e);
      if (x < 0 || x > width || y > height) return;
      const near = proximity(y);
      if (near > 0) push(x, TAP_IMPULSE * near);
    };

    let frame = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let acc = 0;
    let t = 0;
    const STEP_MS = 1000 / 60;

    const loop = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      t += dt / 1000;
      acc += dt;
      let steps = 0;
      while (acc >= STEP_MS && steps < 3) {
        step();
        acc -= STEP_MS;
        steps++;
      }
      if (steps === 3) acc = 0;
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    // Só anima com o hero visível e a aba em primeiro plano.
    const sync = () => {
      const shouldRun = visible && document.visibilityState === "visible";
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    sync();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block ${className}`} />;
};

export default OceanWaves;
