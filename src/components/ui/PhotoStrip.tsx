import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import Icon from "./Icon";

export type StripPhoto = { src: string; alt: string };

const PLACEHOLDER_RATIOS = ["aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]"];
const DRAG_THRESHOLD = 5;

const PhotoStrip = ({ photos }: { photos: StripPhoto[] }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<StripPhoto | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });
  const [dragging, setDragging] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    // As fotos carregam depois (lazy), mudando a largura total da faixa.
    el.querySelectorAll("img").forEach((img) => img.addEventListener("load", updateArrows));
    return () => ro.disconnect();
  }, [photos, updateArrows]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Arrastar com o mouse no desktop (no touch o scroll nativo já funciona).
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !scrollerRef.current) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: scrollerRef.current.scrollLeft };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scrollerRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    setDragging(false);
  };

  const arrowClass =
    "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/90 text-abyss shadow-md backdrop-blur transition hover:border-lagoon md:flex";

  return (
    <>
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(e) => {
            // Um arraste não deve abrir a foto.
            if (drag.current.moved) {
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
          onDragStart={(e) => e.preventDefault()}
          className={`no-scrollbar -mr-4 flex gap-3 overflow-x-auto md:-mr-0 md:cursor-grab ${
            dragging ? "select-none md:cursor-grabbing" : "snap-x snap-mandatory"
          }`}
          role="group"
          aria-label={t("photosAria")}
        >
          {/* Sem fotos ainda: reserva o espaço com molduras vazias, como o card vazio da ref. 2 */}
          {photos.length === 0 &&
            PLACEHOLDER_RATIOS.map((ratio, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={`flex h-60 shrink-0 snap-start items-center justify-center rounded-2xl border border-line bg-white text-line md:h-[300px] ${ratio}`}
              >
                <Icon name="wave" size={28} />
              </div>
            ))}
          {photos.map((p) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(p)}
              className="shrink-0 snap-start overflow-hidden rounded-2xl border border-line md:cursor-[inherit]"
            >
              <img src={p.src} alt={p.alt} loading="lazy" className="block h-60 w-auto max-w-none md:h-[300px]" />
            </button>
          ))}
        </div>

        {canPrev && (
          <button type="button" onClick={() => scrollByPage(-1)} aria-label={t("photosPrev")} className={`${arrowClass} left-3`}>
            <Icon name="arrow" size={18} className="rotate-180" />
          </button>
        )}
        {canNext && (
          <button type="button" onClick={() => scrollByPage(1)} aria-label={t("photosNext")} className={`${arrowClass} right-3`}>
            <Icon name="arrow" size={18} />
          </button>
        )}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-abyss/90 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label={t("lightboxClose")}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 font-mono text-white"
          >
            ✕
          </button>
          <img src={open.src} alt={open.alt} className="max-h-full max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </>
  );
};

export default PhotoStrip;
