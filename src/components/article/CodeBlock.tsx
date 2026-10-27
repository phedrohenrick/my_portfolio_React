// Bloco de código com cara de janela de terminal e destaque de sintaxe Java simples (sem lib).
const KEYWORDS =
  "abstract|boolean|class|double|extends|final|float|implements|int|interface|long|new|private|protected|public|return|static|super|this|void";

const TOKEN_RE = new RegExp(
  [
    "(\\/\\/.*$)", // comentário
    '("(?:\\\\.|[^"\\\\])*")', // string
    `\\b(${KEYWORDS})\\b`, // palavra reservada
    "\\b([A-Z][A-Za-z0-9_]*)\\b", // tipo
    "\\b(\\d+(?:\\.\\d+)?)\\b", // número
  ].join("|"),
  "gm",
);

const tokenClass = ["text-white/45 italic", "text-[#e6c98f]", "text-seafoam", "text-tide", "text-[#e6c98f]"];

const highlight = (code: string) => {
  const nodes: (string | JSX.Element)[] = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    const index = m.index ?? 0;
    if (index > last) nodes.push(code.slice(last, index));
    const group = m.slice(1).findIndex((g) => g !== undefined);
    nodes.push(
      <span key={index} className={tokenClass[group]}>
        {m[0]}
      </span>,
    );
    last = index + m[0].length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
};

const CodeBlock = ({ code, file }: { code: string; file?: string }) => (
  <figure className="overflow-hidden rounded-2xl bg-abyss shadow-[0_8px_24px_rgba(1,44,50,0.12)]">
    <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#e9877a]" aria-hidden="true" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#e6c98f]" aria-hidden="true" />
      <span className="h-2.5 w-2.5 rounded-full bg-seafoam" aria-hidden="true" />
      <span className="ml-2 font-mono text-xs text-white/50">{file ?? "java"}</span>
    </figcaption>
    <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-white/90 md:text-sm">
      <code>{highlight(code)}</code>
    </pre>
  </figure>
);

export default CodeBlock;
