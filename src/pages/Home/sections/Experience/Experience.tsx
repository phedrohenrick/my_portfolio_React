import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../../../components/ui/Icon";
import PhotoStrip from "../../../../components/ui/PhotoStrip";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { experiences } from "../../../../data/experience";
import { useLocalized } from "../../../../hooks/useLocalized";

const DOT_OFFSET = 14;

const splitSentences = (text: string) => text.split(/(?<=[.!?])\s+/).filter(Boolean);

const Experience = () => {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const reduce = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [dotYs, setDotYs] = useState<number[]>([]);
  const [lit, setLit] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      setDotYs(itemRefs.current.map((el) => (el ? el.offsetTop + DOT_OFFSET : 0)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 60%", "end 60%"] });
  const first = dotYs[0] ?? 0;
  const last = dotYs[dotYs.length - 1] ?? 0;

  const rawY = useTransform(scrollYProgress, (p) => {
    const h = trackRef.current?.offsetHeight ?? 0;
    return Math.min(Math.max(p * h, first), last);
  });
  const y = useSpring(rawY, { stiffness: 90, damping: 20, mass: 0.6 });

  useMotionValueEvent(y, "change", (v) => {
    const count = Math.max(1, dotYs.filter((d) => v >= d - 2).length);
    setLit((prev) => (prev === count ? prev : count));
  });

  const litCount = reduce ? experiences.length : Math.max(lit, 1);

  return (
    <section id="experiencia" className="mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24">
      <SectionHeader comment={t("expComment")} title={t("expTitle")} subtitle={t("expSubtitle")} />

      <div ref={trackRef} className="relative pl-10">
        <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-0.5 -translate-x-1/2 rounded bg-line" />
        {reduce ? (
          <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-0.5 -translate-x-1/2 rounded bg-seaglass" />
        ) : (
          <>
            <motion.div
              aria-hidden="true"
              className="absolute left-[11px] top-0 w-0.5 -translate-x-1/2 rounded bg-seaglass"
              style={{ height: y }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-[11px] top-0 z-10"
              style={{ y, marginLeft: -10, marginTop: -10 }}
            >
              <motion.div
                className="h-5 w-5 rounded-full border-[3px] border-white bg-seaglass shadow-[0_0_0_4px_rgba(111,168,168,0.25)]"
                animate={{ x: [-2, 2, -2], rotate: [-6, 6, -6] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </>
        )}

        <ol className="space-y-16">
          {experiences.map((exp, i) => {
            const isLit = i < litCount;
            return (
              <li
                key={exp.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`relative transition-opacity duration-500 ${isLit ? "opacity-100" : "opacity-60"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-[-29px] top-2 z-[5] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-seaglass transition-colors duration-500 ${
                    isLit ? "bg-seaglass" : "bg-foam"
                  }`}
                />
                <h3 className="font-sans text-xl font-bold leading-snug tracking-tight md:text-2xl">{l(exp.role)}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-mist">{l(exp.period)}</p>
                <p className="mt-1 font-mono text-sm font-medium text-seaglass-ink">@ {l(exp.company)}</p>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 font-mono text-sm font-medium text-lagoon-ink underline-offset-4 hover:underline"
                  >
                    {t("btnVisitSite")}
                    <Icon name="arrow" size={14} />
                  </a>
                )}

                {exp.photos && (
                  <div className="mt-5">
                    <PhotoStrip photos={exp.photos.map((p) => ({ src: p.src, alt: l(p.alt) }))} />
                  </div>
                )}

                <ul className="mt-5 space-y-3">
                  {splitSentences(l(exp.description)).map((sentence, si) => (
                    <li key={si} className="flex gap-3 font-mono text-sm leading-7">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 text-seaglass">
                        ▸
                      </span>
                      <span>{sentence}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
