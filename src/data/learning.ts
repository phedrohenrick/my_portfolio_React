import type { Localized } from "./types";

export type LearningItem = {
  title: string;
  href: string;
  logo: string;
  logoAlt: Localized;
  description: Localized;
};

export const learningItems: LearningItem[] = [
  {
    title: "roadmap.sh",
    href: "https://roadmap.sh/",
    logo: "/images/learning/roadmap.png",
    logoAlt: { pt: "Logo do roadmap.sh", en: "roadmap.sh logo" },
    description: {
      pt: "Trilhas da comunidade para cada stack. É daí que vem o que eu estudo em seguida.",
      en: "Community roadmaps for every stack. That's where what I study next comes from.",
    },
  },
  {
    title: "CS50 · Harvard",
    href: "https://cs50.harvard.edu/x/",
    logo: "/images/learning/cs50.ico",
    logoAlt: { pt: "Logo do CS50", en: "CS50 logo" },
    description: {
      pt: "Cursos de programação de Harvard, de graça.",
      en: "Harvard's programming courses, for free.",
    },
  },
];

export const learningFootnote: Localized = {
  pt: "Estudo todo dia um pouco: o que aprendo no trabalho eu aprofundo aqui.",
  en: "I study a little every day: what I learn at work I deepen here.",
};
