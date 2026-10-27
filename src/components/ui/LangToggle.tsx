import { useTranslation } from "react-i18next";

// Seletor PT | EN, pensado para fundo escuro (hero e topo do artigo).
const LangToggle = ({ className = "" }: { className?: string }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(isEn ? "pt" : "en")}
      aria-label={t("langAria")}
      className={`rounded-full border border-white/30 px-3 py-1 font-mono text-xs ${className}`}
    >
      <span className={isEn ? "text-white/60" : "font-semibold text-white"}>PT</span>
      <span className="text-white/60"> | </span>
      <span className={isEn ? "font-semibold text-white" : "text-white/60"}>EN</span>
    </button>
  );
};

export default LangToggle;
