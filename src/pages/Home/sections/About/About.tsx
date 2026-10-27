import { useTranslation } from "react-i18next";
import Card from "../../../../components/ui/Card";
import LinkCard from "../../../../components/ui/LinkCard";
import Reveal from "../../../../components/ui/Reveal";
import Rich from "../../../../components/ui/Rich";
import SectionHeader from "../../../../components/ui/SectionHeader";
import Tag from "../../../../components/ui/Tag";
import TechCloud from "../../../../components/ui/TechCloud";
import { aboutParagraphs, aboutPhoto, nowBlock, techCloud, toolbox } from "../../../../data/about";
import { channels } from "../../../../data/bookshelf";
import Articles from "../Articles/Articles";
import { learningItems } from "../../../../data/learning";
import { useLocalized } from "../../../../hooks/useLocalized";

const toneCycle = ["seaglass", "tide", "lagoon", "seafoam"] as const;

const About = () => {
  const { t } = useTranslation();
  const { l } = useLocalized();

  return (
    <section id="sobre" className="mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24">
      <Reveal>
        <SectionHeader comment={t("aboutComment")} title={t("aboutTitle")} />
        <div className="space-y-4 font-mono text-base leading-8 text-abyss">
          {aboutParagraphs.map((p, i) => (
            <p key={i}>
              <Rich text={l(p)} />
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <Card className="p-5">
          <p className="flex items-center gap-3 font-mono text-sm font-medium text-lagoon-ink">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-sonar rounded-full bg-lagoon" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-lagoon" />
            </span>
            {t("nowLabel")}
          </p>
          <dl className="mt-3 space-y-1 font-mono text-sm">
            <div className="flex flex-wrap gap-x-2">
              <dt className="text-mist">{t("nowWorking")}</dt>
              <dd>{l(nowBlock.working)}</dd>
            </div>
            {nowBlock.next && (
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-mist">{t("nowNext")}</dt>
                <dd>{l(nowBlock.next)}</dd>
              </div>
            )}
          </dl>
        </Card>
      </Reveal>

      {aboutPhoto && (
        <Reveal className="mt-10">
          <img
            src={aboutPhoto.src}
            alt={l(aboutPhoto.alt)}
            className="mx-auto max-h-[480px] w-auto max-w-full rounded-2xl border border-line"
          />
        </Reveal>
      )}

      <Reveal className="mt-16">
        <h3 className="font-sans text-2xl font-bold tracking-tight">{t("learningTitle")}</h3>
        <p className="mt-2 font-mono text-sm text-mist">{t("learningSubtitle")}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {learningItems.map((item) => (
            <LinkCard
              key={item.href}
              href={item.href}
              title={item.title}
              description={l(item.description)}
              logo={<img src={item.logo} alt={l(item.logoAlt)} className="h-full w-full object-contain" />}
            />
          ))}
        </div>

        {/* Os livros que li (BookCarousel) saíram por enquanto; os artigos ocupam o lugar. */}
        <Articles embedded />

        {channels.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-mist">{t("shelfChannels")}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {channels.map((c) => (
                <LinkCard key={c.link} href={c.link} title={c.name} description={l(c.why)} />
              ))}
            </div>
          </div>
        )}
      </Reveal>

      <Reveal className="mt-16">
        <h3 className="font-sans text-2xl font-bold tracking-tight">{t("toolboxTitle")}</h3>
        <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-5">
            {toolbox.map((group, gi) => (
              <div key={group.name.pt}>
                <p className="font-mono text-xs uppercase tracking-widest text-mist">{l(group.name)}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <Tag key={tag} tone={toneCycle[gi % toneCycle.length] ?? "seaglass"}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <TechCloud items={techCloud} />
        </div>
      </Reveal>
    </section>
  );
};

export default About;
