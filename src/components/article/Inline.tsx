// Formatação inline dos blocos do artigo: `código`, **negrito** e *itálico*.
const TOKEN_RE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

const Inline = ({ text }: { text: string }) => (
  <>
    {text.split(TOKEN_RE).map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length > 1)
        return (
          <code key={i} className="rounded-md bg-lagoon-soft px-1.5 py-0.5 font-mono text-[0.85em] text-lagoon-ink">
            {part.slice(1, -1)}
          </code>
        );
      if (part.startsWith("**") && part.endsWith("**") && part.length > 3)
        return (
          <strong key={i} className="font-semibold text-abyss">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("*") && part.endsWith("*") && part.length > 1) return <em key={i}>{part.slice(1, -1)}</em>;
      return part;
    })}
  </>
);

export default Inline;
