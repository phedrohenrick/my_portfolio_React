import { useTranslation } from "react-i18next";
import Card from "../../../../components/ui/Card";
import Icon from "../../../../components/ui/Icon";
import Reveal from "../../../../components/ui/Reveal";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { recommendations } from "../../../../data/recommendations";
import { social } from "../../../../data/social";
import { useLocalized } from "../../../../hooks/useLocalized";

const Recommendations = () => {
  const { t } = useTranslation();
  const { l } = useLocalized();

  if (recommendations.length === 0) return null;

  // Mais de 4: faixa horizontal com rolagem, como a PhotoStrip.
  const strip = recommendations.length > 4;
  const listClass = strip
    ? "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
    : "grid gap-4 md:grid-cols-2";

  return (
    <section id="recomendacoes" className="mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24">
      <SectionHeader comment={t("recComment")} title={t("recTitle")} subtitle={t("recSubtitle")} />
      <ul className={listClass}>
        {recommendations.map((r) => (
          <li key={r.name} className={strip ? "w-80 shrink-0 snap-start" : ""}>
            <Reveal className="h-full">
              <Card className="relative flex h-full flex-col p-6">
                <Icon name="linkedin" size={18} className="absolute right-5 top-5 text-lagoon" />
                <blockquote className="space-y-4 pr-6 font-mono text-sm leading-7">
                  {l(r.text)
                    .split("\n\n")
                    .map((paragraph, pi, all) => (
                      <p key={pi}>
                        {pi === 0 && "“"}
                        {paragraph}
                        {pi === all.length - 1 && "”"}
                      </p>
                    ))}
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div>
                    {r.linkedin ? (
                      <a
                        href={r.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-sans font-semibold hover:underline"
                      >
                        {r.name}
                        <Icon name="external" size={13} />
                      </a>
                    ) : (
                      <p className="font-sans font-semibold">{r.name}</p>
                    )}
                    <p className="font-mono text-xs text-mist">{l(r.role)}</p>
                  </div>
                </div>
                <a
                  href={social.linkedinRecommendations}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1 self-end font-mono text-sm font-medium text-lagoon-ink underline-offset-4 hover:underline"
                >
                  {t("recViewLinkedin")}
                  <Icon name="arrow" size={14} />
                </a>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Recommendations;
