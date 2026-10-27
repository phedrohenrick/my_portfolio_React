import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Reveal from "../../../../components/ui/Reveal";
import { articles } from "../../../../data/articles";
import { useLocalized } from "../../../../hooks/useLocalized";
import { formatArticleDate } from "../../../../lib/date";

// embedded: dentro de outra seção (hoje, no lugar dos livros em "Sobre"), sem o espaçamento de seção.
const Articles = ({ embedded = false }: { embedded?: boolean }) => {
  const { t } = useTranslation();
  const { l, lang } = useLocalized();

  if (articles.length === 0) return null;

  return (
    <section
      id="artigos"
      className={embedded ? "mt-16 scroll-mt-8" : "mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24"}
    >
      <header className="mb-10 text-center">
        <h2 className="font-mono text-2xl font-bold tracking-tight text-abyss">{t("artTitle")}</h2>
        <p className="mt-2 font-mono text-base text-mist">{t("artSubtitle")}</p>
      </header>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Reveal key={a.slug}>
            <Link to={`/artigos/${a.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-abyss shadow-[0_4px_14px_rgba(1,44,50,0.12)]">
                <img
                  src={a.cover}
                  alt={l(a.coverAlt)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/30 to-transparent" aria-hidden="true" />
                <h3 className="absolute inset-x-0 bottom-0 p-4 font-mono text-sm font-bold leading-snug text-white">
                  {l(a.title)}
                </h3>
              </div>
              <p className="mt-3 font-mono text-sm leading-relaxed text-mist">{l(a.summary)}</p>
              <p className="mt-2 font-mono text-xs text-mist/80">{formatArticleDate(a.date, lang)}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Articles;
