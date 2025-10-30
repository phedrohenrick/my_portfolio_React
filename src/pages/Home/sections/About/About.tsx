import { styled, Box } from "@mui/material"
import StyledCard from "portifolio/src/components/StyledCard/StyledCard"
import Git from "portifolio/src/assets/images/ImageSkills/Git.png"
import Docker from "portifolio/src/assets/images/ImageSkills/Docker.png"
import Angular from "portifolio/src/assets/images/ImageSkills/Angular.png"
import Spring from "portifolio/src/assets/images/ImageSkills/Spring.png"
import Java from "portifolio/src/assets/images/ImageSkills/Java.png"
import ReactLogo from "portifolio/src/assets/images/ImageSkills/React.png"
import TypescriptLogo from "portifolio/src/assets/images/ImageSkills/Typescript.png"
import CLogo from "portifolio/src/assets/images/ImageSkills/C.png"
import PostgresqlLogo from "portifolio/src/assets/images/ImageSkills/PostgreSql.png"
import { Container, Grid, Typography } from "@mui/material";
import AnimatedBackground from "portifolio/src/assets/images/AnimatedBackground/AboutBackground.gif";
import { Trans, useTranslation } from 'react-i18next'
import { motion } from "framer-motion"


const About = () => { //uma notação diferente para function 

const {t} = useTranslation();
  
  const StyledAbout = styled("div")(({ }) => ({
    backgroundImage: `url(${AnimatedBackground})`,
    
  }))



  


  return (
    <>

      <StyledAbout id="sobre" className="
                flex
                items-top
                justify-center
                bg-cover 
                bg-no-repeat 
                bg-center 
                sm:bg-top 
                md:bg-center 
                lg:bg-bottom 
                w-full
                overflow-x-hidden
                py-12 md:py-16">
        <Container>
          <Grid container spacing={2} alignItems="center" gap={"40px"} >

            <Grid item xs={12} md={6} className=" 
                p-4 
                sm:p-6 
                md:p-8 
                h-auto 
                text-center">
              <Typography variant="h2" color="primnary" >

              {t("aboutMe")}

              </Typography>

            </Grid>

            <Grid item xs={12} md={5}>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ 
                opacity: 1,
                x : 0
                
              }}
              transition={{ duration: 0.3 }}
              viewport={{once:true}}>
              <Typography variant="body1" color="primary" textAlign="left" pb={2} fontWeight={"bold"} marginTop={"-40px"}>

              <Trans
               i18nKey="tx1" 
              components={{ 1:  <span style= {{color: "#E67E22"}}/>}} 
              />

                </Typography>

                </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ 
                opacity: 1,
                x : 0
                
              }}
              transition={{ duration: 0.3 }}
              viewport={{once:true}}
>
              <Typography variant="body1" color="primary" textAlign="left" pb={2} fontWeight={"bold"} marginTop={"-40px"} > 
              <Trans
               i18nKey="tx2" 
              components={{ 1:  <span style= {{color: "#E67E22"}}/>}} 
              />

                 </Typography>
                 </motion.div>
            </Grid>

            <Grid item xs={12} md={4} >
              <Typography variant="h2" color="primary" >
              <Trans 
              i18nKey="skills" 
              components={{ 1: <span color = "white"/>}} 
              />
              </Typography>
            </Grid>
            {/* Full-width band with two rows of icons: 5 on top, 4 on bottom */}
            <Grid item xs={12} sx={{ mt: { xs: 2, md: 3 }, mb: { xs: 4, md: 6 } }}>
              <Box sx={{ position: 'relative', left: '50%', right: '50%', ml: '-50vw', mr: '-50vw', width: '100vw', boxSizing: 'border-box' }}>
                <StyledCard>
                {(() => {
                  const skills = [Git, Java, Angular, Spring, ReactLogo, Docker, CLogo, PostgresqlLogo, TypescriptLogo];
                  const row1 = skills.slice(0, 5);
                  const row2 = skills.slice(5);
                  return (
                    <>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: 'repeat(3, minmax(0, 1fr))',
                            sm: 'repeat(4, minmax(0, 1fr))',
                            md: 'repeat(5, minmax(0, 1fr))',
                          },
                          gap: { xs: 2, sm: 3, md: 4 },
                          alignItems: 'center',
                          justifyItems: 'center',
                          mb: { xs: 2, md: 3 },
                        }}
                      >
                        {row1.map((imgSrc, index) => (
                          <Box key={`r1-${index}`} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                              component="img"
                              src={imgSrc}
                              alt="skill"
                              sx={{
                                width: { xs: 110, sm: 140, md: 170, lg: 200 },
                                height: 'auto',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: 'repeat(3, minmax(0, 1fr))',
                            sm: 'repeat(4, minmax(0, 1fr))',
                            md: 'repeat(4, minmax(0, 1fr))',
                          },
                          gap: { xs: 2, sm: 3, md: 4 },
                          alignItems: 'center',
                          justifyItems: 'center',
                        }}
                      >
                        {row2.map((imgSrc, index) => (
                          <Box key={`r2-${index}`} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                              component="img"
                              src={imgSrc}
                              alt="skill"
                              sx={{
                                width: { xs: 110, sm: 140, md: 170, lg: 200 },
                                height: 'auto',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </>
                  );
                })()}
                </StyledCard>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </StyledAbout>
    </>
  )
}

export default About


