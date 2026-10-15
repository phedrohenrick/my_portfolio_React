import type { Localized } from "./types";

export type Book = {
  title: string;
  author: string;
  cover?: string;
  status: "read" | "reading";
  link?: string;
};

export type Channel = { name: string; link: string; why: Localized };

export type Article = { title: string; source: string; link: string };

// TODO: preencher. Cada lista vazia faz o respectivo bloco não aparecer; as três vazias escondem a seção Estante.
export const books: Book[] = [
  /* Exemplo:
  { title: "Clean Code", author: "Robert C. Martin", cover: "/images/books/clean-code.jpg", status: "read" },
  */
];

export const channels: Channel[] = [
  /* Exemplo:
  { name: "Nome do canal", link: "https://youtube.com/@...", why: { pt: "Por que recomendo.", en: "Why I recommend it." } },
  */
];

export const articles: Article[] = [
  /* Exemplo:
  { title: "Título do artigo", source: "autor ou site", link: "https://..." },
  */
];
