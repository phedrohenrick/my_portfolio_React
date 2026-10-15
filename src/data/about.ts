import type { Localized, Photo } from "./types";

// Marcação: **palavra** vira destaque em seaglass-ink.
export const aboutParagraphs: Localized[] = [
  {
    pt: "Olá! Sou o **Phedro**, **desenvolvedor backend Java** apaixonado por sistemas escaláveis e computação em nuvem. Atuo na Global Code — The Developer's Conference, construindo e sustentando sistemas de alto tráfego com Spring Boot, Quarkus e AWS.",
    en: "Hello! I'm **Phedro**, a **Java backend developer** passionate about scalable systems and cloud computing. I work at Global Code — The Developer's Conference, building and maintaining high-traffic systems with Spring Boot, Quarkus, and AWS.",
  },
  {
    pt: "No **back-end**, trabalho com Java, Spring Boot, Quarkus e arquitetura de microsserviços com mensageria (Kafka), sempre com foco em performance e boas práticas. No **front-end**, utilizo React e TypeScript para complementar as soluções que construo.",
    en: "On the **back end**, I work with Java, Spring Boot, Quarkus, and microservices architecture with messaging (Kafka), always focused on performance and best practices. On the **front end**, I use React and TypeScript to complement the solutions I build.",
  },
];

// TODO: foto pessoal opcional da seção Sobre (ex.: { src: "/images/about/foto.jpg", alt: { pt: "...", en: "..." } })
export const aboutPhoto: Photo | null = null;

// Bloco "agora": usa só o que já está no código (Global Code / sistemas do TDC).
export const nowBlock = {
  working: {
    pt: "backend Java na Global Code, nos sistemas do TDC",
    en: "Java backend at Global Code, on the TDC systems",
  },
  // TODO: "próximo passo" — preencher com o que você quer fazer em seguida; vazio = linha não aparece.
  next: null as Localized | null,
};

export type ToolGroup = { name: Localized; tags: string[] };

export const toolbox: ToolGroup[] = [
  { name: { pt: "Backend", en: "Backend" }, tags: ["java", "spring-boot", "quarkus", "spring-security", "keycloak", "kafka"] },
  { name: { pt: "Cloud", en: "Cloud" }, tags: ["aws", "ecs", "sqs", "lambda", "cloudformation", "docker", "nginx"] },
  { name: { pt: "Dados", en: "Data" }, tags: ["postgresql", "jpa", "hibernate"] },
  { name: { pt: "Front", en: "Front" }, tags: ["react", "typescript", "angular", "tailwind"] },
];

// Nuvem de tecnologias ao lado da caixa de ferramentas. size: 3 = maior, 1 = menor.
// Logos em public/images/tech (Devicon; Keycloak do Simple Icons).
export type TechLogo = { name: string; logo: string; size: 1 | 2 | 3 };

export const techCloud: TechLogo[] = [
  { name: "Java", logo: "/images/tech/java.svg", size: 3 },
  { name: "Spring", logo: "/images/tech/spring.svg", size: 3 },
  { name: "Docker", logo: "/images/tech/docker.svg", size: 2 },
  { name: "Quarkus", logo: "/images/tech/quarkus.svg", size: 2 },
  { name: "PostgreSQL", logo: "/images/tech/postgresql.svg", size: 2 },
  { name: "AWS", logo: "/images/tech/aws.svg", size: 2 },
  { name: "Kafka", logo: "/images/tech/kafka.svg", size: 1 },
  { name: "React", logo: "/images/tech/react.svg", size: 2 },
  { name: "TypeScript", logo: "/images/tech/typescript.svg", size: 1 },
  { name: "Keycloak", logo: "/images/tech/keycloak.svg", size: 1 },
  { name: "Nginx", logo: "/images/tech/nginx.svg", size: 1 },
  { name: "Hibernate", logo: "/images/tech/hibernate.svg", size: 1 },
  { name: "Angular", logo: "/images/tech/angular.svg", size: 1 },
  { name: "Tailwind CSS", logo: "/images/tech/tailwind.svg", size: 1 },
];
