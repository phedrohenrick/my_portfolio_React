import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import Blocks from "../../components/article/Blocks";
import Comments from "../../components/article/Comments";
import Icon from "../../components/ui/Icon";
import LangToggle from "../../components/ui/LangToggle";
import Tag from "../../components/ui/Tag";
import { findArticle } from "../../data/articles";
import { useLocalized } from "../../hooks/useLocalized";
import { formatArticleDate } from "../../lib/date";

const tones = ["lagoon", "seafoam", "tide", "seaglass"] as const;

// Seção atual do sumário: o último título que já passou do topo da tela.
const useActiveHeading = (ids: string[]) => {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const update = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.3) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids]);

  return active;
};

const ArticlePage = () => {
  const { slug } = useParams();
  const article = findArticle(slug);
  const { t, i18n } = useTranslation();
  const { l, lang } = useLocalized();

  // O artigo abre no idioma original; o seletor PT | EN troca o texto inteiro.
  const originalLang = article?.lang;
  useEffect(() => {
    if (originalLang) i18n.changeLanguage(originalLang);
  }, [slug, originalLang, i18n]);

  const blocks = article?.blocks[lang] ?? [];
  const headings = blocks.flatMap((b) => (b.type === "heading" ? [b] : []));
  // Os IDs dos títulos são iguais nas duas versões, então a lista não muda com o idioma.
  const [ids] = useState(() => [
    ...(article?.blocks.en ?? []).flatMap((b) => (b.type === "heading" ? [b.id] : [])),
    "comentarios",
  ]);
  const active = useActiveHeading(ids);

  if (!article) return <Navigate to="/" replace />;

  const url = `https://www.phedrohenrick-portifolio.com.br/artigos/${article.slug}`;

  return (
    <main id="top">
      <Helmet>
        <html lang={lang === "en" ? "en" : "pt-BR"} />
        <title>{`${l(article.title)} — Phedro Henrick`}</title>
        <meta name="description" content={l(article.summary)} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={l(article.title)} />
        <meta property="og:description" content={l(article.summary)} />
        <meta property="og:url" content={url} />
      </Helmet>

      {/* Topo: o mar do hero em versão curta, deságuando na base clara. */}
      <header className="relative overflow-hidden bg-[#013f47] text-white">
        <div className="relative flex w-full items-start justify-between px-4 pt-6 md:px-6 md:pt-5">
          <Link to="/" aria-label={t("logoAria")} className="font-sans leading-none text-white no-underline">
            <span className="block text-sm font-medium tracking-wide">phedro</span>
            <span className="block text-3xl font-bold tracking-tight">henrick</span>
          </Link>
        </div>
        {/* Fica fixo no canto enquanto a página rola. */}
        <LangToggle className="fixed right-4 top-6 z-50 bg-[#013f47]/85 shadow-lg shadow-black/10 backdrop-blur md:right-6 md:top-5" />

        <div className="relative mx-auto w-full max-w-5xl px-4 pb-28 pt-12 md:px-8 md:pb-36 md:pt-16">
          <Link
            to="/#artigos"
            className="group inline-flex items-center gap-2 font-mono text-sm text-white/70 hover:text-white"
          >
            <Icon name="arrow" size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
            {t("artBack")}
          </Link>
          <p className="mt-6 font-mono text-sm text-seafoam">~/artigos/{article.slug}</p>
          <h1 className="mt-2 max-w-3xl font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {l(article.title)}
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-white/70 md:text-sm">
            {formatArticleDate(article.date, lang)} · {t("artMinutes", { count: article.readingMinutes })} · Phedro Henrick
          </p>
          {article.lang !== lang && t("artLangNote") && (
            <p className="mt-3 font-mono text-xs text-white/60">{t("artLangNote")}</p>
          )}
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 block h-12 w-full md:h-20"
        >
          <path d="M0 40 C 240 0 480 0 720 34 S 1200 74 1440 30 V80 H0 Z" fill="#466668" opacity="0.6" />
          <path d="M0 56 C 300 24 560 30 800 52 S 1240 70 1440 48 V80 H0 Z" fill="#f7fbfa" />
        </svg>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
        <img
          src={article.cover}
          alt={l(article.coverAlt)}
          className="relative -mt-10 aspect-[16/9] w-full rounded-[24px] border border-line bg-white object-cover shadow-[0_12px_32px_rgba(1,44,50,0.12)] md:-mt-16"
        />
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-12 px-4 pb-16 pt-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_200px]">
        <div className="min-w-0 max-w-[70ch] font-sans text-[17px] leading-[1.75] text-abyss/90">
          <article className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <Tag key={tag} tone={tones[i % tones.length]}>
                  {tag}
                </Tag>
              ))}
            </div>
            <Blocks blocks={blocks} />
          </article>

          <div className="mt-16 border-t border-line pt-12">
            <Comments slug={article.slug} prompt={l(article.closing)} />
          </div>
        </div>

        {headings.length > 0 && (
          <nav aria-label={t("artToc")} className="hidden lg:block">
            <div className="sticky top-8">
              <p className="font-mono text-xs uppercase tracking-wider text-mist">{t("artToc")}</p>
              <ul className="mt-3 space-y-2 border-l border-line">
                {[...headings, { id: "comentarios", text: t("cmTitle") }].map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`-ml-px block border-l-2 py-0.5 pl-3 font-mono text-xs leading-relaxed transition-colors ${
                        active === h.id ? "border-lagoon text-abyss" : "border-transparent text-mist hover:text-abyss"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-12 md:px-8">
        <Link to="/#artigos" className="group inline-flex items-center gap-2 font-mono text-sm text-lagoon-ink">
          <Icon name="arrow" size={16} className="rotate-180 transition-transform group-hover:-translate-x-1" />
          {t("artBack")}
        </Link>
        <p className="mt-8 font-mono text-xs text-mist">
          © {new Date().getFullYear()} Phedro Henrick. {t("footerRights")}
        </p>
      </footer>
    </main>
  );
};

export default ArticlePage;
