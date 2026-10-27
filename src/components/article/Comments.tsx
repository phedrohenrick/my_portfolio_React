import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useLocalized } from "../../hooks/useLocalized";
import { CommentError, fetchComments, postComment, type ArticleComment } from "../../lib/comments";
import { timeAgo } from "../../lib/date";

const NAME_MAX = 60;
const COMMENT_MAX = 1000;
const NAME_KEY = "comment-name";

const avatarTones = [
  "bg-lagoon-soft text-lagoon-ink",
  "bg-seafoam-soft text-seafoam-ink",
  "bg-tide-soft text-tide-ink",
  "bg-seaglass-soft text-seaglass-ink",
];

// Mesma pessoa, mesma cor.
const toneFor = (name: string) => avatarTones[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % avatarTones.length];

const readSavedName = () => {
  try {
    return localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
};

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 font-mono text-sm text-abyss placeholder:text-mist/70 focus:border-lagoon focus:outline-none";

const Comments = ({ slug, prompt }: { slug: string; prompt: string }) => {
  const { t } = useTranslation();
  const { lang } = useLocalized();

  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [name, setName] = useState(readSavedName);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchComments(slug)
      .then((list) => active && setComments(list))
      .catch(() => active && setLoadError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    if (trimmedName.length < 2 || trimmedComment.length < 2) {
      setStatus("error");
      setError(t("cmInvalid"));
      return;
    }
    setStatus("sending");
    try {
      const created = await postComment({ slug, name: trimmedName, comment: trimmedComment, website });
      if (created) {
        setComments((list) => [...list, created]);
        setLoadError(false);
      }
      setComment("");
      setStatus("sent");
      try {
        localStorage.setItem(NAME_KEY, trimmedName);
      } catch {
        // sem localStorage: só não lembra o nome
      }
    } catch (err) {
      setStatus("error");
      const code = err instanceof CommentError ? err.code : "";
      setError(code === "rate_limited" ? t("cmRateLimited") : code.startsWith("invalid_") ? t("cmInvalid") : t("cmError"));
    }
  };

  return (
    <section id="comentarios" aria-labelledby="comments-title" className="scroll-mt-8">
      <p className="font-mono text-sm text-mist">// {t("cmTitle").toLowerCase()}</p>
      <h2 id="comments-title" className="mt-1 font-sans text-2xl font-bold tracking-tight text-abyss md:text-3xl">
        {t("cmTitle")} {comments.length > 0 && <span className="font-mono text-lg font-normal text-mist">({comments.length})</span>}
      </h2>
      <p className="mt-3 text-mist">
        {prompt}
      </p>

      <form onSubmit={submit} noValidate className="mt-6 rounded-[20px] border border-line bg-white p-5 shadow-[0_1px_2px_rgba(1,44,50,0.04)] md:p-6">
        <div className="space-y-4">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wider text-mist">{t("cmName")}</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={NAME_MAX}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("cmNamePh")}
              className={`mt-1.5 ${inputClass}`}
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wider text-mist">{t("cmText")}</span>
            <textarea
              name="comment"
              required
              minLength={2}
              maxLength={COMMENT_MAX}
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("cmTextPh")}
              className={`mt-1.5 resize-y ${inputClass}`}
            />
            <span className="mt-1 block text-right font-mono text-xs text-mist">
              {comment.length}/{COMMENT_MAX}
            </span>
          </label>
          {/* Honeypot: escondido de pessoas, robôs preenchem. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 rounded-full bg-abyss px-5 py-2.5 font-mono text-sm font-medium text-white transition-colors hover:bg-seaglass-ink disabled:opacity-60"
          >
            <span className="text-seafoam">$</span>
            {status === "sending" ? t("cmSending") : t("cmSubmit")}
          </button>
          <p role="status" aria-live="polite" className="font-mono text-sm">
            {status === "sent" && <span className="text-seafoam-ink">{t("cmSuccess")}</span>}
            {status === "error" && <span className="text-[#9a4a3f]">{error}</span>}
          </p>
        </div>
      </form>

      <div className="mt-8">
        {loading && <p className="font-mono text-sm text-mist">{t("cmLoading")}</p>}
        {!loading && loadError && <p className="font-mono text-sm text-mist">{t("cmLoadError")}</p>}
        {!loading && !loadError && comments.length === 0 && <p className="font-mono text-sm text-mist">{t("cmEmpty")}</p>}
        {comments.length > 0 && (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-base font-semibold ${toneFor(c.name)}`}
                >
                  {c.name.trim().charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-line bg-white px-4 py-3">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-sans font-semibold text-abyss">{c.name}</span>
                    <time dateTime={c.createdAt} className="font-mono text-xs text-mist">
                      {timeAgo(c.createdAt, lang)}
                    </time>
                  </p>
                  <p className="mt-1 whitespace-pre-line break-words font-mono text-sm leading-relaxed text-abyss/90">{c.comment}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Comments;
