import { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../../../components/ui/Card";
import Icon from "../../../../components/ui/Icon";
import Reveal from "../../../../components/ui/Reveal";
import SectionHeader from "../../../../components/ui/SectionHeader";
import Tag from "../../../../components/ui/Tag";
import { projects, type Project } from "../../../../data/projects";
import { useLocalized } from "../../../../hooks/useLocalized";

const ProjectCard = ({ project }: { project: Project }) => {
  const { t } = useTranslation();
  const { l } = useLocalized();
  const [open, setOpen] = useState(false);
  const linkClass =
    "inline-flex items-center gap-1 font-mono text-sm font-medium text-lagoon-ink underline-offset-4 hover:underline";

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <img
        src={project.image}
        alt={l(project.title)}
        loading="lazy"
        className="aspect-[16/9] w-full border-b border-line bg-abyss object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-sans text-lg font-semibold">{l(project.title)}</h3>
          {project.featured && (
            <span className="rounded-md bg-seafoam-soft px-2 py-0.5 font-mono text-xs text-seafoam-ink">
              {t("projFeatured")}
            </span>
          )}
          {project.inDevelopment && (
            <span className="rounded-md bg-tide-soft px-2 py-0.5 font-mono text-xs text-tide-ink">{t("projInDev")}</span>
          )}
        </div>
        <p className={`mt-3 font-mono text-sm leading-relaxed text-mist ${open ? "" : "line-clamp-4"}`}>
          {l(project.description)}
        </p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-1 self-start font-mono text-xs text-lagoon-ink underline underline-offset-4"
        >
          {open ? t("readLess") : t("readMore")}
        </button>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} tone="tide">
              {tag}
            </Tag>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className={linkClass}>
              <Icon name="github" size={16} />
              {t("projRepo")}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className={linkClass}>
              <Icon name="external" size={16} />
              {t("projDemo")}
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  // Destaques primeiro; todos na mesma grade, que se reorganiza conforme a largura.
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

  return (
    <section id="projetos" className="mx-auto w-full max-w-6xl px-4 md:px-8 py-16 md:py-24">
      <SectionHeader comment={t("projComment")} title={t("projTitle")} subtitle={t("projSubtitle")} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ordered.map((p) => (
          <Reveal key={p.id}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
