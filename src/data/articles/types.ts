import type { Lang, Localized } from "../types";

// Texto dos blocos aceita `código`, **negrito** e *itálico* (ver components/article/Inline.tsx).
export type Block =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; file?: string; code: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | { type: "definitions"; items: { term: string; text: string }[] }
  | { type: "questions"; items: Question[] }
  | { type: "takeaway"; title: string; text: string };

export type Question = {
  question: string;
  verdict: "yes" | "no" | "yes-but";
  short: string;
  body: Block[];
};

export type Article = {
  slug: string;
  lang: Lang; // idioma original: o artigo abre nele
  date: string; // AAAA-MM-DD
  readingMinutes: number;
  tags: string[];
  cover: string;
  title: Localized;
  summary: Localized;
  coverAlt: Localized;
  closing: Localized; // chamada para os comentários
  blocks: Record<Lang, Block[]>; // o ID dos títulos deve ser o mesmo nas duas versões
};
