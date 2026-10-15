import type { Localized } from "./types";

export type Achievement = {
  title: Localized;
  year: string;
  description: Localized;
  image?: string;
  link?: string;
};

// TODO: preencher com suas conquistas (olimpíadas, certificações, prêmios, marcos).
// Lista vazia = a seção Conquistas não aparece no site.
// Obs.: public/DownloadFiles/images/OBI.png existe, mas o significado não foi confirmado; não foi publicado.
export const achievements: Achievement[] = [
  /* Exemplo:
  {
    title: { pt: "Nome da conquista", en: "Achievement name" },
    year: "2024",
    description: { pt: "Descrição curta.", en: "Short description." },
    image: "/images/achievements/exemplo.png",
    link: "https://...",
  },
  */
];
