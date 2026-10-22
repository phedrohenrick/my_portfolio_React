import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Book } from "../../data/bookshelf";

const SPEED = 24; // px por segundo: carrossel lento

// Carrossel contínuo de capas. Ao passar o mouse (ou tocar) numa capa, ele para,
// o livro sobe um pouco se destacando e aparecem título e autor embaixo.
const BookCarousel = ({ books }: { books: Book[] }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Lista duplicada para o loop sem emenda (a segunda cópia é só visual).
  const items = reduce ? books : [...books, ...books];

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let x = 0;
    let last = performance.now();
    let frame = 0;
    let visible = true;

    const loop = (now: number) => {
      const dt = Math.min(100, now - last) / 1000;
      last = now;
      if (activeRef.current === null) {
        const half = track.scrollWidth / 2;
        x -= SPEED * dt;
        if (half > 0 && -x >= half) x += half;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      } else if (!visible && was) {
        cancelAnimationFrame(frame);
      }
    });
    io.observe(viewport);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [reduce]);

  // No toque, tocar fora do carrossel solta o livro selecionado.
  useEffect(() => {
    if (active === null) return;
    const onDown = (e: PointerEvent) => {
      if (!viewportRef.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [active]);

  return (
    <div
      ref={viewportRef}
      onMouseLeave={() => setActive(null)}
      className={`-mx-4 md:mx-0 ${
        reduce
          ? "no-scrollbar overflow-x-auto"
          : "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      }`}
    >
      <ul ref={trackRef} className="flex w-max gap-6 px-4 pb-2 pt-5 will-change-transform md:px-0">
        {items.map((book, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;
          const copy = i >= books.length;
          return (
            <li key={`${book.title}-${i}`} aria-hidden={copy || undefined} className="w-28 shrink-0 md:w-36">
              <button
                type="button"
                tabIndex={copy ? -1 : 0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onPointerUp={(e) => {
                  if (e.pointerType !== "mouse") setActive((cur) => (cur === i ? null : i));
                }}
                aria-label={`${book.title} — ${book.author}`}
                className={`relative block w-full transition duration-300 ease-out ${
                  isActive ? "z-10 -translate-y-3 scale-[1.06]" : ""
                } ${dimmed ? "opacity-60" : "opacity-100"}`}
              >
                <img
                  src={book.cover}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className={`aspect-[3/4] w-full rounded-[3px] object-cover transition-shadow duration-300 ${
                    isActive ? "shadow-2xl shadow-abyss/30" : "shadow-md shadow-abyss/15"
                  }`}
                />
                {/* Lombada: sombra suave na borda esquerda, para parecer um livro. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-2.5 rounded-l-[3px] bg-gradient-to-r from-black/25 to-transparent"
                />
                {book.reading && (
                  <span className="absolute -top-2 left-2 rounded-full bg-seafoam px-2 py-0.5 font-mono text-[10px] font-medium text-abyss shadow">
                    {t("readingNow")}
                  </span>
                )}
              </button>
              <div
                className={`mt-3 h-14 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                aria-hidden={!isActive}
              >
                <p className="line-clamp-2 font-sans text-sm font-semibold leading-tight">{book.title}</p>
                <p className="mt-0.5 line-clamp-1 font-mono text-xs text-mist">{book.author}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookCarousel;
