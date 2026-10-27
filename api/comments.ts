import { Redis } from "@upstash/redis";

// Comentários dos artigos, guardados no Upstash Redis (integração do Marketplace da Vercel).
// Uma lista por artigo: comments:<slug>. Cada item é um comentário em JSON.

export type StoredComment = { id: string; name: string; comment: string; createdAt: string };

const SLUG_RE = /^[a-z0-9-]{1,80}$/;
const NAME_MIN = 2;
const NAME_MAX = 60;
const COMMENT_MIN = 2;
const COMMENT_MAX = 1000;
const MAX_PER_ARTICLE = 500;
const RATE_LIMIT = 3; // comentários por IP
const RATE_WINDOW_S = 60;

// A integração da Vercel cria KV_REST_API_*; a do Upstash direto cria UPSTASH_REDIS_REST_*.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "",
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

// Tira caracteres de controle (mantém quebras de linha no comentário) e espaços nas pontas.
const clean = (value: unknown, keepNewlines: boolean) =>
  typeof value === "string"
    ? value
        .replace(keepNewlines ? /[^\P{Cc}\n]/gu : /\p{Cc}/gu, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    : "";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!SLUG_RE.test(slug)) return json({ error: "invalid_slug" }, 400);

  const comments = await redis.lrange<StoredComment>(`comments:${slug}`, 0, -1);
  return json({ comments });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "invalid_body" }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "invalid_body" }, 400);

  // Honeypot: campo invisível que só robô preenche. Finge sucesso.
  if (typeof body.website === "string" && body.website.length > 0) return json({ ok: true }, 201);

  const slug = typeof body.slug === "string" ? body.slug : "";
  const name = clean(body.name, false);
  const comment = clean(body.comment, true);

  if (!SLUG_RE.test(slug)) return json({ error: "invalid_slug" }, 400);
  if (name.length < NAME_MIN || name.length > NAME_MAX) return json({ error: "invalid_name" }, 400);
  if (comment.length < COMMENT_MIN || comment.length > COMMENT_MAX) return json({ error: "invalid_comment" }, 400);

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const rateKey = `comments-rate:${ip}`;
  const count = await redis.incr(rateKey);
  if (count === 1) await redis.expire(rateKey, RATE_WINDOW_S);
  if (count > RATE_LIMIT) return json({ error: "rate_limited" }, 429);

  const stored: StoredComment = { id: crypto.randomUUID(), name, comment, createdAt: new Date().toISOString() };
  const key = `comments:${slug}`;
  await redis.rpush(key, JSON.stringify(stored));
  await redis.ltrim(key, -MAX_PER_ARTICLE, -1);

  return json({ comment: stored }, 201);
}
