import { useTranslation } from "react-i18next";
import Card from "../../../../components/ui/Card";
import Icon from "../../../../components/ui/Icon";
import Reveal from "../../../../components/ui/Reveal";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { achievements } from "../../../../data/achievements";
import { useLocalized } from "../../../../hooks/useLocalized";

const Achievements = () => {
  const { t } = useTranslation();
  const { l } = useLocalized();

  if (achievements.length === 0) return null;

  return (
    <section id="conquistas" className="mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24">
      <SectionHeader comment={t("achComment")} title={t("achTitle")} subtitle={t("achSubtitle")} />
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={`${a.year}-${i}`}>
            <Card className="h-full p-5">
              <div className="flex items-center gap-3">
                {a.image ? (
                  <img src={a.image} alt={l(a.title)} className="h-12 w-12 rounded-xl border border-line object-cover" />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-seafoam-soft text-seafoam-ink">
                    <Icon name="award" size={24} />
                  </span>
                )}
                <div>
                  <h3 className="font-sans text-lg font-semibold leading-tight">{l(a.title)}</h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-mist">{a.year}</p>
                </div>
              </div>
              <p className="mt-3 font-mono text-sm leading-relaxed text-mist">{l(a.description)}</p>
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-sm font-medium text-lagoon-ink underline-offset-4 hover:underline"
                >
                  <Icon name="external" size={14} />
                  link
                </a>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
