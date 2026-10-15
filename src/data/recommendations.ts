import type { Localized } from "./types";

export type Recommendation = {
  name: string;
  role: Localized;
  // Parágrafos separados por linha em branco ("\n\n").
  text: Localized;
  // URL do perfil do autor no LinkedIn; vazio = o nome aparece sem link.
  linkedin: string;
};

export const recommendations: Recommendation[] = [
  {
    name: "Henrique Garcia",
    role: { pt: "Analista Pleno", en: "Mid-level Analyst" },
    text: {
      pt: "Tive a oportunidade de trabalhar em equipe com o Phedro na Global Code, onde enfrentamos diversos desafios e aprendizados ao longo dos projetos. Ele sempre demonstrou muita disposição para aprender, além de estar constantemente disponível para apoiar a equipe.\n\nPhedro é um profissional comprometido e participativo, contribuindo ativamente nas reuniões e se envolvendo projetos propostos. Sem dúvida, é alguém que agrega valor ao time e busca sempre evoluir profissionalmente.",
      en: "I had the opportunity to work on a team with Phedro at Global Code, where we faced many challenges and learnings throughout the projects. He always showed a strong willingness to learn, and was constantly available to support the team.\n\nPhedro is a committed and engaged professional, actively contributing in meetings and getting involved in the proposed projects. Without a doubt, he adds value to the team and is always looking to grow professionally.",
    },
    linkedin: "", // TODO: URL do LinkedIn do Henrique Garcia
  },
  {
    name: "Sophia Gallindo",
    role: { pt: "Desenvolvedora Backend", en: "Backend Developer" },
    text: {
      pt: "Phedro é uma pessoa genuinamente interessada em ajudar os outros, sempre disposto a compartilhar conhecimento e apoiar o time no que fosse preciso. É animado, curioso e se envolve bastante com os projetos, buscando entender melhor os contextos e contribuir da melhor forma, o que se reflete na qualidade do seu trabalho no dia a dia.",
      en: "Phedro is genuinely interested in helping others, always willing to share knowledge and support the team with whatever was needed. He is enthusiastic, curious and deeply involved in the projects, seeking to better understand the context and contribute in the best way, which shows in the quality of his day-to-day work.",
    },
    linkedin: "", // TODO: URL do LinkedIn da Sophia Gallindo
  },
];
