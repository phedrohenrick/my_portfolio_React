type Props = { comment: string; title: string; subtitle?: string };

const SectionHeader = ({ comment, title, subtitle }: Props) => (
  <header className="mb-8">
    <p className="font-mono text-sm text-mist">{comment}</p>
    <h2 className="mt-1 font-sans text-3xl font-bold tracking-tight text-abyss md:text-4xl">{title}</h2>
    {subtitle && <p className="mt-2 font-mono text-sm text-mist">{subtitle}</p>}
  </header>
);

export default SectionHeader;
