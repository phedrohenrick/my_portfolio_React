import { abstractionInJava } from "./abstraction-in-java";
import type { Article } from "./types";

// Mais recente primeiro.
export const articles: Article[] = [abstractionInJava];

export const findArticle = (slug: string | undefined) => articles.find((a) => a.slug === slug);
