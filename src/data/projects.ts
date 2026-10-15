import type { Localized } from "./types";

export type Project = {
  id: string;
  title: Localized;
  description: Localized;
  image: string;
  repo?: string;
  demo?: string;
  tags: string[];
  featured?: boolean;
  inDevelopment?: boolean;
};

const img = (name: string) => `/DownloadFiles/images/${name}`;

export const projects: Project[] = [
  {
    id: "priatoo",
    title: { pt: "Priatoo", en: "Priatoo" },
    description: {
      pt: "SaaS de cardápio digital multi-tenant que desenvolvi do zero, do backend ao frontend. Backend em Java 21 e Spring Boot, com autenticação via Spring Security (OAuth2/JWT) e Keycloak, PostgreSQL e Nginx como proxy reverso via Docker Compose. O frontend em React cobre três frentes: a landing de captação de clientes, o cardápio digital do cliente final e o painel de gestão do lojista.",
      en: "Multi-tenant digital menu SaaS I built from the ground up, from backend to frontend. Java 21 and Spring Boot backend, with authentication via Spring Security (OAuth2/JWT) and Keycloak, PostgreSQL, and Nginx as a reverse proxy via Docker Compose. The React frontend covers three fronts: the customer-acquisition landing page, the customer-facing digital menu, and the shop owner's management panel.",
    },
    image: img("priatoo.png"),
    demo: "https://priatoo.com.br",
    tags: ["java-21", "spring-boot", "spring-security", "postgresql", "docker", "nginx", "keycloak", "react", "typescript"],
    featured: true,
  },
  {
    id: "mineradora",
    title: { pt: "Backend Mineradora com Quarkus", en: "Mining Backend with Quarkus" },
    description: {
      pt: "Aqui, desenvolvo o backend para um sistema de uma mineradora com o intuito de explorar o Quarkus Framework e a mensageria com Kafka. Nesse sistema, adoto a arquitetura de microserviços, que se comunicam via REST e mensageria, em uma abordagem híbrida. O sistema é composto por quatro microserviços: um gerencia as autenticações, outro consulta a cotação atual do dólar por meio de uma API externa, o terceiro administra as propostas de compra dos clientes, e o quarto envia essas propostas para os analistas junto a cotação do dólar do dia. Os dados para o microserviço de propostas são recebidos via eventos do Kafka, enviados pelo segundo e terceiro microserviços. Venha conhecer mais!",
      en: "Here, I develop the backend for a mining company system with the aim of exploring the Quarkus Framework and messaging with Kafka. In this system, I adopt a microservices architecture that communicates via REST and messaging in a hybrid approach. The system consists of four microservices: one manages authentications, another queries the current dollar exchange rate through an external API, the third manages customer purchase proposals, and the fourth sends these proposals to analysts along with the day's dollar exchange rate. The data for the proposal microservice is received via Kafka events, sent by the second and third microservices. Come learn more!",
    },
    image: img("inDevelopment.png"),
    repo: "https://github.com/phedrohenrick/cotacao_microservice_quarkus",
    tags: ["java", "quarkus", "microservicos", "kafka", "postgresql", "hibernate", "maven", "docker"],
  },
  {
    id: "callforpapers",
    title: { pt: "API Call for Papers - Quarkus", en: "API Call for Papers - Quarkus" },
    description: {
      pt: "API desenvolvida com Quarkus para gerenciamento de submissões de artigos acadêmicos (call for papers). Utiliza PostgreSQL em container Docker, RestEasy para endpoints RESTful e Java 21. A API oferece funcionalidades completas de CRUD para gerenciar submissões, incluindo criação, listagem, busca por ID, atualização e exclusão de artigos. O projeto foi implantado na nuvem (Railway) para facilitar testes e demonstrações, e possui um cliente React para interação mais intuitiva.",
      en: "API developed with Quarkus for managing academic paper submissions (call for papers). Uses PostgreSQL in Docker container, RestEasy for RESTful endpoints, and Java 21. The API offers complete CRUD functionality for managing submissions, including creation, listing, search by ID, updating, and deletion of articles. The project was deployed in the cloud (Railway) to facilitate testing and demonstrations, and has a React client for more intuitive interaction.",
    },
    image: img("api_Quarkus.png"),
    repo: "https://github.com/phedrohenrick/API_call_for_papers-Quarkus",
    tags: ["quarkus", "java-21", "postgresql", "docker", "resteasy", "maven"],
  },
  {
    id: "springapi",
    title: { pt: "Spring Rest Api", en: "Spring Rest API" },
    description: {
      pt: "Este projeto consiste em uma API RESTful desenvolvida com Spring Boot, oferecendo operações CRUD (Create, Read, Update, Delete) para o gerenciamento de recursos. A API foi projetada para ser escalável, de fácil manutenção e com foco na eficiência, utilizando as melhores práticas de desenvolvimento backend.",
      en: "This project consists of a RESTful API developed with Spring Boot, providing CRUD (Create, Read, Update, Delete) operations for resource management. The API is designed to be scalable, easy to maintain, and efficient, utilizing the best practices in backend development.",
    },
    image: img("api.png"),
    repo: "https://github.com/phedrohenrick/Spring_webCrude",
    tags: ["spring-boot", "spring-data-jpa", "postgresql", "spring-security", "maven"],
  },
  {
    id: "estoque",
    title: { pt: "Estoque", en: "Inventory" },
    description: {
      pt: "É uma aplicação frontend desenvolvida em Angular, voltada para o controle e monitoramento de estoques. A interface permite visualizar e gerenciar os itens de um inventário de forma intuitiva e eficiente. A aplicação conta com uma tela dedicada ao gerenciamento de produtos, onde é possível adicionar, editar, visualizar e remover itens, facilitando o acompanhamento do estoque em tempo real.",
      en: "This is a frontend application developed in Angular, aimed at controlling and monitoring inventories. The interface allows for intuitive and efficient management of inventory items. The application includes a dedicated screen for product management, enabling users to add, edit, view, and delete items, making real-time inventory tracking easier.",
    },
    image: img("dashboard.png"),
    repo: "https://github.com/phedrohenrick/Angular_webCrud",
    tags: ["angular", "typescript", "spring", "java", "jpa", "postgresql"],
  },
  {
    id: "portfolio",
    title: { pt: "Meu portifólio", en: "My Portfolio" },
    description: {
      pt: "Este portfólio é uma aplicação estática desenvolvida em React para exibir meus projetos e habilidades como desenvolvedor full stack. Com uma navegação fluida por meio de âncoras e um design moderno e responsivo, o site tem como objetivo fornecer uma visão clara e objetiva das minhas competências técnicas e realizações em projetos pessoais e profissionais.",
      en: "This portfolio is a static application developed in React to showcase my projects and skills as a full-stack developer. With smooth navigation using anchors and a modern, responsive design, the site aims to provide a clear and objective view of my technical competencies and achievements in personal and professional projects.",
    },
    image: img("portifolio.png"),
    repo: "https://github.com/phedrohenrick/phedrohenrick-My_portifolio",
    tags: ["react", "typescript", "tailwind", "framer-motion"],
  },
];
