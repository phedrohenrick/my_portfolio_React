import gcTdcFloripa from "../assets/images/experience/globalcode-tdc-floripa.jpg";
import gcTdcSp from "../assets/images/experience/globalcode-tdc-sp-2026.jpg";
import gcSetup from "../assets/images/experience/globalcode-setup.jpg";
import gcVoo from "../assets/images/experience/globalcode-voo.jpg";
import priatooIpad from "../assets/images/experience/priatoo-ipad.jpg";
import type { Localized, Photo } from "./types";

export type ExperienceItem = {
  id: string;
  role: Localized;
  company: Localized;
  period: Localized;
  description: Localized;
  link?: string;
  // TODO: fotos de cada experiência (TDC, palco, totens, equipe...).
  // Lista vazia = molduras vazias reservando o espaço. Sem o campo = sem faixa de fotos.
  photos?: Photo[];
};

/* Exemplo:
  photos: [
    { src: "/images/experience/tdc-palco.jpg", alt: { pt: "Palco do TDC", en: "TDC stage" } },
  ],
*/

export const experiences: ExperienceItem[] = [
  {
    id: "globalcode",
    role: { pt: "Desenvolvedor Backend Java", en: "Backend Java Developer" },
    company: { pt: "Global Code — The Developer's Conference", en: "Global Code — The Developer's Conference" },
    period: { pt: "Abril de 2025 — Atual", en: "April 2025 — Present" },
    description: {
      pt: "Atuo na construção e manutenção de módulos RESTful de alta disponibilidade para inscrições, pagamentos e gestão de membros, usando Java, Spring Boot e Quarkus. Participo de decisões de arquitetura e infraestrutura em nuvem AWS (ECS, ALB, CloudFormation, SQS, Lambda, S3), desenvolvi o sistema de totens de check-in do evento e trabalho em integrações estratégicas com ESummit e RDStation.",
      en: "I build and maintain high-availability RESTful modules for registrations, payments, and member management using Java, Spring Boot, and Quarkus. I take part in architecture and AWS infrastructure decisions (ECS, ALB, CloudFormation, SQS, Lambda, S3), built the event's self check-in kiosk system, and work on strategic integrations with ESummit and RDStation.",
    },
    photos: [
      {
        src: gcSetup,
        alt: { pt: "Phedro no setup de trabalho, com código no monitor", en: "Phedro at the desk setup, with code on the monitor" },
      },
      {
        src: gcTdcFloripa,
        alt: { pt: "Phedro no TDC Florianópolis, com crachá da organização", en: "Phedro at TDC Florianópolis, wearing an organizer badge" },
      },
      {
        src: gcTdcSp,
        alt: { pt: "Phedro na plateia do TDC São Paulo 2026", en: "Phedro in the audience at TDC São Paulo 2026" },
      },
      {
        src: gcVoo,
        alt: { pt: "Vista da janela do avião sobre o litoral", en: "View from the airplane window over the coastline" },
      },
    ],
  },
  {
    id: "priatoo",
    role: { pt: "Desenvolvedor Full Stack — Projeto Autônomo", en: "Full Stack Developer — Independent Project" },
    company: { pt: "Priatoo", en: "Priatoo" },
    period: { pt: "Projeto autônomo", en: "Independent project" },
    description: {
      pt: "Atuei como engenheiro full stack em um SaaS de cardápio digital multi-tenant: backend em Java 21 e Spring Boot, com autenticação via Spring Security (OAuth2/JWT) e Keycloak, PostgreSQL e Nginx como proxy reverso via Docker Compose. No frontend, construí em React três frentes — landing de captação, cardápio digital do cliente e painel de gestão do lojista — com temas dinâmicos por tenant.",
      en: "I worked as a full stack engineer on a multi-tenant digital menu SaaS: Java 21 and Spring Boot backend with Spring Security (OAuth2/JWT) authentication and Keycloak, PostgreSQL, and Nginx as a reverse proxy via Docker Compose. On the frontend, I built three fronts in React — the marketing landing page, the customer-facing digital menu, and the shop owner's management panel — with dynamic per-tenant theming.",
    },
    link: "https://priatoo.com.br",
    photos: [
      {
        src: priatooIpad,
        alt: {
          pt: "Landing page do Priatoo aberta num iPad, com uma impressora térmica de pedidos na frente",
          en: "Priatoo landing page on an iPad, with a thermal order printer in front",
        },
      },
    ],
  },
  {
    id: "ifg",
    role: { pt: "Monitor Java Backend — Programação Orientada a Objetos", en: "Java Backend Teaching Assistant — OOP" },
    company: { pt: "Instituto Federal de Goiás (IFG)", en: "Instituto Federal de Goiás (IFG)" },
    period: { pt: "Dezembro de 2024 — Maio de 2025", en: "December 2024 — May 2025" },
    description: {
      pt: "Mentoria e suporte técnico a alunos em Java, Programação Orientada a Objetos e fundamentos de backend, conduzindo sessões práticas de codificação, projetos em equipe e orientação em testes automatizados e boas práticas de desenvolvimento.",
      en: "Mentored and supported students in Java, Object-Oriented Programming, and backend fundamentals, leading hands-on coding sessions, team projects, and guidance on automated testing and development best practices.",
    },
    photos: [],
  },
  {
    id: "telgo",
    role: { pt: "Analista de Suporte de Redes — Estágio", en: "Network Support Analyst — Internship" },
    company: { pt: "Telgo Telecom", en: "Telgo Telecom" },
    period: { pt: "Setembro de 2022 — Novembro de 2023", en: "September 2022 — November 2023" },
    description: {
      pt: "Monitoramento e suporte à infraestrutura de redes corporativas em ambiente NOC, com configuração de equipamentos (roteadores, wireless, fibra óptica) e acompanhamento contínuo com Zabbix e Grafana — a base que hoje sustenta minha atuação em sistemas backend.",
      en: "Monitored and supported corporate network infrastructure in a NOC environment, configuring equipment (routers, wireless, fiber optics) and tracking uptime with Zabbix and Grafana — the foundation that today supports my work on backend systems.",
    },
  },
];
