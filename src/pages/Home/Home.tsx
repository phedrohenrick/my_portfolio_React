import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"
import Hero from "./sections/Hero/Hero"
import About from "./sections/About/About"
import Experience from "./sections/Experience/Experience"
import Projects from "./sections/Projects/Projects"
import Achievements from "./sections/Achievements/Achievements"
import Recommendations from "./sections/Recommendations/Recommendations"
import Contact from "./sections/Contact/Contact"

const Home = () => {
  const { i18n } = useTranslation()
  const isEn = i18n.language === "en"

  return (
    <main id="top">
      <Helmet>
        <html lang={isEn ? "en" : "pt-BR"} />
        <title>{isEn ? "Phedro Henrick — Java backend & cloud dev" : "Phedro Henrick — Dev backend Java e cloud"}</title>
        <meta
          name="description"
          content={
            isEn
              ? "Phedro Henrick, Java backend and cloud developer at Global Code (TDC). Experience, projects and how I study."
              : "Phedro Henrick, desenvolvedor backend Java e cloud na Global Code (TDC). Experiência, projetos e como estudo."
          }
        />
        <link rel="canonical" href="https://www.phedrohenrick-portifolio.com.br" />
      </Helmet>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Achievements />
      <Recommendations />
      <Contact />
    </main>
  )
}

export default Home
