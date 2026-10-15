import type { Localized } from "./types";
import rafa from "../assets/images/rafa.jpg";
import adriano from "../assets/images/adriano.jpg";

export type Recommendation = {
  name: string;
  role: Localized;
  text: Localized;
  photo: string;
  // URL do perfil do autor no LinkedIn; vazio = o nome aparece sem link.
  linkedin: string;
};

export const recommendations: Recommendation[] = [
  {
    name: "Rafael Xavier",
    role: { pt: "Analista de Redes", en: "Network Analyst" },
    text: {
      pt: "Trabalhar com o Phedro foi uma experiência excelente. Mostra seu comprometimento com o aprendizado contínuo. A dedicação e a busca por aprimoramento são características marcantes, e tenho certeza de que ele continuará evoluindo em todas as áreas. É inspirador acompanhar sua trajetória!",
      en: "Working with Phedro was an excellent experience. He demonstrates commitment to continuous learning. His dedication and pursuit of improvement are remarkable traits, and I am sure he will keep evolving in all areas. It is inspiring to follow his journey!",
    },
    photo: rafa,
    linkedin: "", // TODO: URL do LinkedIn do Rafael Xavier
  },
  {
    name: "Adriano Aparecido",
    role: { pt: "Automação Industrial", en: "Industrial Automation" },
    text: {
      pt: "O Phedro demonstra conhecimento técnico em diversas áreas da tecnologia, sempre abordando cada desafio com precisão e clareza. Ele está sempre em busca de novas formas de otimizar processos e superar expectativas, mostrando comprometimento e paixão pelo que faz. Sua capacidade de aprendizado contínuo e aplicação prática reflete seu empenho em alcançar a excelência em cada projeto.",
      en: "Phedro demonstrates technical knowledge in various areas of technology, always approaching each challenge with precision and clarity. He is constantly seeking new ways to optimize processes and exceed expectations, showcasing commitment and passion for what he does. His ability for continuous learning and practical application reflects his drive to achieve excellence in every project.",
    },
    photo: adriano,
    linkedin: "", // TODO: URL do LinkedIn do Adriano Aparecido
  },
];
