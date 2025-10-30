import styled from "@emotion/styled";
import AnimatedBackground from "../../../../assets/images/AnimatedBackground/ProjectScreen.png";
import { Container, Grid, Typography } from "@mui/material";
import ProjectSlide from "../../../../components/StyledSlide.tsx/StyledSlide";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

const Project = () => {
  const {t} = useTranslation();

  const StyledProjects = styled("div")(() => ({
    backgroundImage: `url(${AnimatedBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    maxWidth: "100%"
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <StyledProjects id="projetos">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={12} fontWeight="bold" className="flex-row-reverse items-center justify-center sm:justify-start sm:m-0 gap-6 sm:gap-8 sm:mr-[20%] md:mr-[20%] lg:mr-[20%] xl:mr-[23%] 2xl:mr-[26%]">
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h2" 
                  color="primary" 
                  fontWeight="bold" 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold z-10"
                >  
                  {t("title_p")}
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={12} className="font-bold mb-[100px] sm:mb-[50px] px-4 sm:px-6 md:px-8">
              <motion.div variants={itemVariants}>
                <ProjectSlide/>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </StyledProjects>
  );
};

export default Project;
