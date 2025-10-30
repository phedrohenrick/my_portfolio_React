import Avatar from "../../../../assets/images/Avatar.png";
import {Box, Container, Grid, styled, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StyledButton from "../../../../components/StyledButton/StyledButton";
import AnimatedBackground from "../../../../assets/images/AnimatedBackground/AnimatedBackground.svg";
import theme from "../../../../theme";
import {downloadFile} from "../../../../components/Functions/DownloadFile.tsx"
import { IconButton } from '@mui/material';
import { motion } from "framer-motion";
import { Trans, useTranslation } from 'react-i18next'
import { useState } from "react";


const Hero = () => {
  const {
    t, 
    i18n : {changeLanguage, language}
  } = useTranslation()

  const [currentLanguage, setCurrentLanguage] = useState(language)

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en'
    changeLanguage(newLanguage)
    setCurrentLanguage(newLanguage)

  }

  const handleDownload = () => {
    downloadFile("meu_curriculo_.pdf");
  };
  const HandleClickConatact = (link: string) => {
    window.location.href = link;
  };

  const StyledHero = styled("div")(({theme}) => ({
    backgroundImage: `url(${AnimatedBackground})`,
    alignItems: "center",
    minHeight: "100vh",
    display: "flex",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    
    [theme.breakpoints.down('sm')]: {
      paddingTop: "60px",
      minHeight: "100vh",
      backgroundPosition: "center top"
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: "40px",
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: "0",
    },
  }))

  const StyledImg = styled("img")(({theme}) => ({
    borderRadius: "50%",
    border: `1px solid ${theme.palette.primary.dark}`,
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    
    [theme.breakpoints.down('sm')]: {
      maxWidth: "200px",
    },
    [theme.breakpoints.between('sm', 'md')]: {
      maxWidth: "250px",
    }
  }))

  return (
    <StyledHero>
      <Container maxWidth="lg">
        {/* Language Button - Mobile Optimized */}
        <Grid container>
          <Grid item xs={12} sx={{
            position: 'absolute',
            top: { xs: 10, sm: 20 },
            right: { xs: 10, sm: 20 },
            zIndex: 10
          }}>
            <button 
              onClick={() => handleChangeLanguage()} 
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              <Trans
                i18nKey="btnChangeLanguage" 
                components={{ 1: <span style={{color: "#E67E22"}}/>}} 
              />
            </button>
          </Grid>
        </Grid>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{once: true}}
        >
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {/* Avatar */}
            <Grid item xs={12} md={5} sx={{ textAlign: 'center', order: { xs: 1, md: 1 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mb: { xs: 2, md: 0 }
              }}>
                <StyledImg src={Avatar} alt="Avatar" />
              </Box>   
            </Grid>
            
            {/* Content */}
            <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 2 } }}>
              <Typography 
                variant="h1" 
                color="secondary" 
                textAlign="center"
                sx={{
                  fontSize: {
                    xs: '1.8rem',
                    sm: '2.5rem',
                    md: '3rem',
                    lg: '4rem',
                    xl: '5rem'
                  },
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                Phedro Henrick
              </Typography>
              
              <Typography 
                variant="h2" 
                color="secondary" 
                textAlign="center"
                sx={{
                  fontSize: {
                    xs: '1.2rem',
                    sm: '1.5rem',
                    md: '2rem',
                    lg: '2.5rem'
                  },
                  mb: 3
                }}
              >
                {t('title')}
              </Typography>

              {/* Buttons */}
              <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <StyledButton onClick={() => handleDownload()}>
                    <DownloadIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {t('btnCv')}
                    </Typography>
                  </StyledButton>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <StyledButton onClick={() => HandleClickConatact("#footer")}>
                    <EmailIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {t('btnContact')}
                    </Typography>
                  </StyledButton>
                </Grid>
              </Grid>

              {/* Social Icons */}
              <Grid container justifyContent="center" spacing={1}>
                {[
                  { icon: GitHubIcon, href: "https://github.com/phedrohenrick" },
                  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/phedro-henrick-da-silva-le%C3%A3o-b13b96234/" },
                  { icon: InstagramIcon, href: "https://www.instagram.com/asking_dev/" }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Grid item key={index}>
                      <motion.div whileHover={{ scale: 1.2, opacity: 1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton 
                          href={social.href} 
                          target="_blank" 
                          sx={{
                            color: '#dfe8e8',
                            fontSize: { xs: 35, sm: 45, md: 50 },
                            opacity: 0.7,
                            '@media (max-width: 899px)': {
                              color: '#254346',
                              opacity: 0.7,
                            },
                          }}
                        >
                          <IconComponent sx={{ fontSize: 'inherit' }} />
                        </IconButton>
                      </motion.div>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </StyledHero>
  );
};

export default Hero;

  

  