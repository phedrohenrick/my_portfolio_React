type Props = { text: string; className?: string };

// Converte **palavra** em destaque seaglass-ink.
const Rich = ({ text, className = "text-seaglass-ink font-semibold" }: Props) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <span key={i} className={className}>
          {part.slice(2, -2)}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    )}
  </>
);

export default Rich;
