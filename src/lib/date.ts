import type { Lang } from "../data/types";

const locale = (lang: Lang) => (lang === "en" ? "en-US" : "pt-BR");

// "2026-10-26" → "26 OUT 2026" / "OCT 26, 2026" (a caixa alta vem do CSS).
export const formatArticleDate = (iso: string, lang: Lang) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(locale(lang), { day: "2-digit", month: "short", year: "numeric" }).replace(/\./g, "").replace(/ de /g, " ");

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

// "há 2 dias" / "2 days ago".
export const timeAgo = (iso: string, lang: Lang) => {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale(lang), { numeric: "auto" });
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(0, "second");
};
