import { useTranslation } from "react-i18next";
import Avatar from "../../../../assets/images/Avatar1.png";
import TypingEffect from "../../../../components/Animations/TypingEffect";
import Icon from "../../../../components/ui/Icon";
import OceanWaves from "../../../../components/ui/OceanWaves";
import Rich from "../../../../components/ui/Rich";
import { social } from "../../../../data/social";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const socials = [
    { name: "github", href: social.github, label: "GitHub" },
    { name: "linkedin", href: social.linkedin, label: "LinkedIn" },
    { name: "instagram", href: social.instagram, label: "Instagram" },
  ] as const;

  return (
    <>
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#013f47] text-white">
        <OceanWaves className="absolute inset-x-0 bottom-0 h-[420px] w-full" />
        <div className="relative flex w-full items-start justify-between px-4 pt-6 md:px-6 md:pt-5">
          <a href="#top" aria-label={t("logoAria")} className="font-sans leading-none text-white no-underline">
            <span className="block text-sm font-medium tracking-wide">phedro</span>
            <span className="block text-3xl font-bold tracking-tight">henrick</span>
          </a>
          <button
            type="button"
            onClick={() => i18n.changeLanguage(isEn ? "pt" : "en")}
            aria-label={t("langAria")}
            className="rounded-full border border-white/30 px-3 py-1 font-mono text-xs"
          >
            <span className={isEn ? "text-white/60" : "font-semibold text-white"}>PT</span>
            <span className="text-white/60"> | </span>
            <span className={isEn ? "font-semibold text-white" : "text-white/60"}>EN</span>
          </button>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl flex-1 content-center items-center gap-10 px-4 pb-48 pt-12 md:grid-cols-[auto_1fr] md:gap-16 md:px-8 md:pb-56 md:pt-8 lg:gap-24">
          {/* Mobile: foto ao lado do nome. Desktop: foto grande com o nome embaixo, como na ref. 2 */}
          <div className="flex items-center gap-5 md:flex-col md:gap-6 md:text-center">
            <img
              src={Avatar}
              alt={t("heroPhotoAlt")}
              className="aspect-[4/5] w-24 shrink-0 rounded-[20px] object-cover object-top shadow-2xl shadow-black/40 sm:w-32 md:w-52 md:rounded-[24px] lg:w-60"
            />
            <div>
              <p className="font-mono text-sm text-white/80 md:text-base">{t("heroGreeting")}</p>
              <h1 className="mt-1 font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Phedro Henrick
              </h1>
              <p className="mt-2 font-mono text-sm text-white/70 md:text-base">{t("heroRole")}</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="max-w-xl font-mono text-base leading-loose md:text-lg">
              <Rich text={t("heroPitch")} className="font-semibold text-seafoam" />
            </p>

            <p className="mt-4 font-mono text-sm text-white/70">
              <span className="text-seafoam">$ </span>
              <TypingEffect text={t("heroTerminal")} delay={400} speed={40} />
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={social.cv}
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-sm font-medium text-abyss hover:bg-seafoam"
              >
                <Icon name="download" size={16} />
                {t("btnCv")}
              </a>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 font-mono text-sm font-medium text-white hover:bg-white/10"
              >
                <Icon name="mail" size={16} />
                {t("btnContact")}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-white/80 hover:text-white"
                >
                  <Icon name={s.name} size={24} />
                </a>
              ))}
            </div>

            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-white/60">{t("coords")}</p>
          </div>
        </div>
      </section>
      <div aria-hidden="true" className="h-10 bg-gradient-to-b from-[#eef7f7] to-foam" />
    </>
  );
};

export default Hero;
