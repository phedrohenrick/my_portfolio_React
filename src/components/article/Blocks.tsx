import { useTranslation } from "react-i18next";
import type { Block, Question } from "../../data/articles/types";
import CodeBlock from "./CodeBlock";
import Inline from "./Inline";

const verdicts: Record<Question["verdict"], { label: string; className: string }> = {
  yes: { label: "verdictYes", className: "bg-seafoam-soft text-seafoam-ink" },
  no: { label: "verdictNo", className: "bg-[rgba(233,135,122,0.18)] text-[#9a4a3f]" },
  "yes-but": { label: "verdictYesBut", className: "bg-tide-soft text-tide-ink" },
};

const QuestionCard = ({ item, n }: { item: Question; n: number }) => {
  const { t } = useTranslation();
  const verdict = verdicts[item.verdict];
  return (
    <li className="rounded-[20px] border border-line bg-white p-5 shadow-[0_1px_2px_rgba(1,44,50,0.04)] md:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm font-semibold text-lagoon-ink">Q{n}</span>
        <span className={`rounded-md px-2 py-0.5 font-mono text-xs font-semibold tracking-wider ${verdict.className}`}>
          {t(verdict.label)}
        </span>
      </div>
      <h3 className="mt-3 font-sans text-xl font-semibold leading-snug text-abyss">{item.question}</h3>
      <p className="mt-1 font-mono text-sm text-mist">{item.short}</p>
      <div className="mt-4 space-y-4">
        <Blocks blocks={item.body} />
      </div>
    </li>
  );
};

const BlockView = ({ block }: { block: Block }) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 id={block.id} className="scroll-mt-8 pt-6 font-sans text-2xl font-bold tracking-tight text-abyss md:text-3xl">
          <a href={`#${block.id}`} className="group">
            {block.text}
            <span className="ml-2 font-mono text-lg text-mist opacity-0 transition-opacity group-hover:opacity-100">#</span>
          </a>
        </h2>
      );
    case "paragraph":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "code":
      return <CodeBlock code={block.code} file={block.file} />;
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag className={`space-y-2 pl-6 ${block.ordered ? "list-decimal marker:font-mono marker:text-lagoon-ink" : "list-disc marker:text-seaglass"}`}>
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <Inline text={item} />
            </li>
          ))}
        </ListTag>
      );
    }
    case "callout":
      return (
        <aside className="rounded-r-2xl border-l-4 border-lagoon bg-lagoon-soft px-5 py-4">
          <p className="font-mono text-sm font-semibold text-lagoon-ink">⚠️ {block.title}</p>
          <p className="mt-1">
            <Inline text={block.text} />
          </p>
        </aside>
      );
    case "figure":
      return (
        <figure>
          <img src={block.src} alt={block.alt} className="w-full rounded-2xl border border-line bg-white" loading="lazy" />
          {block.caption && (
            <figcaption className="mt-3 text-center font-mono text-sm leading-relaxed text-mist">
              <Inline text={block.caption} />
            </figcaption>
          )}
        </figure>
      );
    case "definitions":
      return (
        <dl className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.term} className="rounded-2xl border border-line bg-white p-4">
              <dt className="font-mono text-xs uppercase tracking-wider text-mist">{item.term}</dt>
              <dd className="mt-1 text-base">
                <Inline text={item.text} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case "questions":
      return (
        <ol className="space-y-4">
          {block.items.map((item, i) => (
            <QuestionCard key={item.question} item={item} n={i + 1} />
          ))}
        </ol>
      );
    case "takeaway":
      return (
        <aside className="rounded-[20px] bg-abyss p-6 text-white md:p-8">
          <p className="font-mono text-sm text-seafoam">// tl;dr</p>
          <p className="mt-2 font-sans text-lg leading-relaxed md:text-xl">
            {block.text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
              part.startsWith("**") ? (
                <span key={i} className="font-semibold text-seafoam">
                  {part.slice(2, -2)}
                </span>
              ) : (
                part
              ),
            )}
          </p>
        </aside>
      );
  }
};

const Blocks = ({ blocks }: { blocks: Block[] }) => (
  <>
    {blocks.map((block, i) => (
      <BlockView key={i} block={block} />
    ))}
  </>
);

export default Blocks;
