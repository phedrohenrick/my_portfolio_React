import type { ReactNode } from "react";
import Icon from "./Icon";

type Props = {
  href: string;
  title: string;
  description?: string;
  logo?: ReactNode;
  external?: boolean;
  download?: boolean;
};

const LinkCard = ({ href, title, description, logo, external = true, download }: Props) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    {...(download ? { download: true } : {})}
    className="group block h-full rounded-[20px] border border-line bg-white p-6 shadow-[0_1px_2px_rgba(1,44,50,0.04)] transition-colors hover:border-lagoon"
  >
    {logo && (
      <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-xl border border-line bg-white text-lagoon-ink">
        {logo}
      </div>
    )}
    <p className="flex items-center gap-2 font-sans text-lg font-semibold text-abyss">
      {title}
      <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
    </p>
    {description && <p className="mt-2 font-mono text-sm leading-relaxed text-mist">{description}</p>}
  </a>
);

export default LinkCard;
