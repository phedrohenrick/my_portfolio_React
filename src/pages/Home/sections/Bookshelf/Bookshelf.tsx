import { useTranslation } from "react-i18next";
import ImagePlaceholder from "../../../../components/ui/ImagePlaceholder";
import Icon from "../../../../components/ui/Icon";
import LinkCard from "../../../../components/ui/LinkCard";
import Reveal from "../../../../components/ui/Reveal";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { articles, books, channels } from "../../../../data/bookshelf";
import { useLocalized } from "../../../../hooks/useLocalized";

const Bookshelf = () => {
  const { t } = useTranslation();
  const { l } = useLocalized();

  if (books.length === 0 && channels.length === 0 && articles.length === 0) return null;

  return (
    <section id="estante" className="mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24">
      <SectionHeader comment={t("shelfComment")} title={t("shelfTitle")} subtitle={t("shelfSubtitle")} />

      {books.length > 0 && (
        <Reveal className="mb-12">
          <h3 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
            <Icon name="book" size={20} className="text-tide-ink" />
            {t("shelfBooks")}
          </h3>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {books.map((b) => (
              <li key={b.title}>
                {b.cover ? (
                  <img
                    src={b.cover}
                    alt={`${b.title} — ${b.author}`}
                    loading="lazy"
                    className="aspect-[2/3] w-full rounded-lg border border-line object-cover"
                  />
                ) : (
                  <ImagePlaceholder className="aspect-[2/3] w-full rounded-lg" />
                )}
                <p className="mt-2 font-sans text-sm font-semibold leading-tight">{b.title}</p>
                <p className="font-mono text-xs text-mist">{b.author}</p>
                <span
                  className={`mt-1 inline-block rounded-md px-2 py-0.5 font-mono text-xs ${
                    b.status === "read" ? "bg-seafoam-soft text-seafoam-ink" : "bg-tide-soft text-tide-ink"
                  }`}
                >
                  {b.status === "read" ? t("statusRead") : t("statusReading")}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {channels.length > 0 && (
        <Reveal className="mb-12">
          <h3 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
            <Icon name="play" size={20} className="text-tide-ink" />
            {t("shelfChannels")}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {channels.map((c) => (
              <LinkCard key={c.link} href={c.link} title={c.name} description={l(c.why)} />
            ))}
          </div>
        </Reveal>
      )}

      {articles.length > 0 && (
        <Reveal>
          <h3 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
            <Icon name="article" size={20} className="text-tide-ink" />
            {t("shelfArticles")}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((a) => (
              <LinkCard key={a.link} href={a.link} title={a.title} description={a.source} />
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
};

export default Bookshelf;
