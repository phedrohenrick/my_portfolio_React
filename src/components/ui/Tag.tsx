type Props = { children: string; tone?: "seaglass" | "tide" | "lagoon" | "seafoam" };

const tones = {
  seaglass: "bg-seaglass-soft text-seaglass-ink",
  tide: "bg-tide-soft text-tide-ink",
  lagoon: "bg-lagoon-soft text-lagoon-ink",
  seafoam: "bg-seafoam-soft text-seafoam-ink",
};

const Tag = ({ children, tone = "seaglass" }: Props) => (
  <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-xs ${tones[tone]}`}>#{children}</span>
);

export default Tag;
