import About from "./sections/About/About"
import Hero from "./sections/Hero/Hero"
import Project from "./sections/Projects/Projects"
import Experience from "./sections/Experience/Experience"
import Footer from "./sections/Footer/Footer"
import WhatPeopleThink from "./sections/WhatPeopleThink/WhatPeopleThink"
import { Helmet } from "react-helmet"
import { Analytics } from "@vercel/analytics/react"

const Home = () =>{  //uma notação diferente para function 

    return (
      <>
       <Helmet>
        
        <title>Phedro Henrick Portifólio </title>
        <meta name="description" content="Portfólio de desenvolvedor especializado em React e Java. Explore meus projetos e entre em contato." />
        <meta name="keywords" content="React, Java, Spring Boot, Portfólio, Phedro" />
        <link rel="canonical" href="https://www.phedrohenrick-portifolio.com.br" />
      </Helmet>
      <Hero/>
      <About/>
      <Experience/>
      <Project/>
      <WhatPeopleThink/>
      <Footer/>
      <Analytics />
      </>
    )
  }
  
  export default Home
  
