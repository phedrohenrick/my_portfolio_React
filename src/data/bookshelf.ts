import type { Localized } from "./types";
import backendJava from "../assets/images/books/covers/backend-java.jpg";
import springBoot from "../assets/images/books/covers/spring-boot.jpg";
import systemDesignInterview from "../assets/images/books/covers/system-design-interview.jpg";
import sistemasOperacionais from "../assets/images/books/covers/sistemas-operacionais-modernos.webp";
import computerOrganization from "../assets/images/books/covers/computer-organization-and-architecture.webp";
import sistemasDigitais from "../assets/images/books/covers/sistemas-digitais.jpg";

// Título como está escrito na capa. reading: true mostra a etiqueta "lendo agora".
export type Book = {
  title: string;
  author: string;
  cover: string;
  reading?: boolean;
};

export type Channel = { name: string; link: string; why: Localized };

export type Article = { title: string; source: string; link: string };

// Livros do carrossel em "Como me atualizo".
export const books: Book[] = [
  { title: "Back-end Java", author: "Eduardo Felipe Zambom Santana", cover: backendJava },
  { title: "Spring Boot", author: "Fernando Boaglio", cover: springBoot },
  { title: "System Design Interview", author: "Alex Xu", cover: systemDesignInterview },
  { title: "Sistemas Operacionais Modernos", author: "Andrew S. Tanenbaum, Herbert Bos", cover: sistemasOperacionais },
  { title: "Computer Organization and Architecture", author: "William Stallings", cover: computerOrganization },
  { title: "Sistemas Digitais", author: "Ronald J. Tocci, Neal S. Widmer, Gregory L. Moss", cover: sistemasDigitais },
];

// Canais do YouTube: aparecem abaixo dos livros quando a lista não estiver vazia.
export const channels: Channel[] = [
  /* Exemplo:
  { name: "Nome do canal", link: "https://youtube.com/@...", why: { pt: "Por que recomendo.", en: "Why I recommend it." } },
  */
];

// TODO: artigos escritos por mim — formato e seção ainda a planejar.
export const articles: Article[] = [];
