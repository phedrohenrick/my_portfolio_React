import { useTranslation } from "react-i18next";
import Icon from "../../../../components/ui/Icon";
import LinkCard from "../../../../components/ui/LinkCard";
import Reveal from "../../../../components/ui/Reveal";
import SectionHeader from "../../../../components/ui/SectionHeader";
import { social } from "../../../../data/social";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <footer id="contato" className="mx-auto w-full max-w-6xl px-4 md:px-8 pb-12 pt-16 md:pt-24">
      <Reveal>
        <SectionHeader comment={t("contactComment")} title={`${t("contactTitle")}`} subtitle={t("contactSubtitle")} />
        <div className="grid gap-4 sm:grid-cols-2">
          <LinkCard
            href={`mailto:${social.email}`}
            external={false}
            title={t("contactEmail")}
            description={social.email}
            logo={<Icon name="mail" size={22} />}
          />
          <LinkCard
            href={social.whatsapp}
            title={t("contactWhatsapp")}
            description={social.whatsappLabel}
            logo={<Icon name="whatsapp" size={22} />}
          />
          <LinkCard
            href={social.linkedin}
            title="LinkedIn"
            description="/in/phedroleao"
            logo={<Icon name="linkedin" size={22} />}
          />
          <LinkCard
            href={social.instagram}
            title="Instagram"
            description="@phe__dev"
            logo={<Icon name="instagram" size={22} />}
          />
          <LinkCard
            href={social.github}
            title="GitHub"
            description="@phedrohenrick"
            logo={<Icon name="github" size={22} />}
          />
          <LinkCard
            href={social.cv}
            external={false}
            download
            title={t("contactCv")}
            description="PDF"
            logo={<Icon name="download" size={22} />}
          />
        </div>
        <p className="mt-12 text-center font-mono text-xs text-mist">{t("footerNote")}</p>
        <p className="mt-2 text-center font-mono text-xs text-mist">
          © {new Date().getFullYear()} Phedro Henrick. {t("footerRights")}
        </p>
      </Reveal>
    </footer>
  );
};

export default Contact;
