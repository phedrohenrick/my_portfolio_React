// Cliente da API de comentários (api/comments.ts, função da Vercel).
export type ArticleComment = { id: string; name: string; comment: string; createdAt: string };

export class CommentError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

export const fetchComments = async (slug: string): Promise<ArticleComment[]> => {
  const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
  if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) throw new CommentError("load_failed");
  const data = (await res.json()) as { comments: ArticleComment[] };
  return data.comments;
};

export const postComment = async (input: {
  slug: string;
  name: string;
  comment: string;
  website: string;
}): Promise<ArticleComment | null> => {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => ({}))) as { comment?: ArticleComment; error?: string };
  if (!res.ok) throw new CommentError(data.error ?? "send_failed");
  return data.comment ?? null;
};
