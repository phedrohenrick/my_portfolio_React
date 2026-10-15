import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { Lang, Localized } from "../data/types";

export const useLocalized = () => {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language === "en" ? "en" : "pt";
  const l = useCallback((value: Localized) => value[lang], [lang]);
  return { l, lang };
};
