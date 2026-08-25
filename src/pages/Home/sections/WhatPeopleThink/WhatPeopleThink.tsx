
import 'tailwindcss/tailwind.css'; // Importa os estilos do Tailwind
import styled from '@emotion/styled';
import {Typography, Container} from '@mui/material';
import AnimatedBackground from "../../../../assets/images/AnimatedBackground/WhatPeopleThink.png"
import { motion } from 'framer-motion';
import rafa from "../../../../assets/images/rafa.jpg";
import adriano from "../../../../assets/images/adriano.jpg";
import { Trans, useTranslation } from 'react-i18next'
import theme from "../../../../theme"



const WhatPeopleThink = () =>{ //uma notação diferente para function 
  const {t} = useTranslation();

    const StyledReview = styled("div")(({}) => ({
        backgroundImage: `url(${AnimatedBackground})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: "100vh",
            width: "100%",
            maxWidth:"100%",
            display: "flex",
           alignItems: "center",
         }));

    return (
      <>
     
     <StyledReview >
     <Container>
        <section className="h-auto w-full mt-28 sm:mt-40 md:mt-60 text-black relative">
        <Typography
      variant="h3"
      color="primary"
      fontWeight={"bold"}
      className="flex justify-center items-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold z-10"
      >
            {t("title_wpt")}
            </Typography>
            <div className="flex flex-col items-center justify-center p-8 sm:p-0 sm:items-start w-full sm:w-[65%] lg:w-[55%] mt-10 lg:mt-14 sm:ml-[10%]">
              <div className="flex items-center gap-2">

                <img alt="review rafael" src={rafa} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-20 xl:h-20 rounded-full relative z-20"/>
                  
             <Typography variant="h5" color = "primary" className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">
                    <Trans
                          i18nKey="personal_title_Rafa" 
                        components={{ 1:  <span style= {{color: theme.palette.accent.main}}/>}}
                        />
                </Typography>
              </div>
              <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ 
                opacity: 1,
                x : 0
              }} 
              viewport={{once:true}}
              className="text-md sm:text-lg md:text-xl lg:text-7xl text-left sm:text-center mt-4 mr-6 ">
              <Typography variant = "h6" color = "primary"  textAlign="left" >
                  <Trans
                      i18nKey="personal_review_R"
                    components={{ 1:  <span style= {{color: theme.palette.accent.main}}/>}}
                    />
              </Typography >
              </motion.div>
            </div>
            
         

      <div className="flex flex-col items-center justify-center p-8 sm:p-0 sm:items-end w-full mt-10 lg:mt-14 sm:pr-[10%] direction-rtl text-right">
        <div className="flex items-center sm:w-[65%] lg:w-[55%] flex-row-reverse gap-2">

        
        <img  alt="review adriano" src={adriano} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-20 xl:h-20 rounded-full relative z-20"/>

          <Typography variant="h5" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          <Trans
          i18nKey="personal_title_Adriano"
         components={{ 1:  <span style= {{color: theme.palette.accent.main}}/>}}
         />
          </Typography>
        </div>
        
        
        <motion.div  initial={{ opacity: 0, x: 50 }}
                whileInView={{ 
                  opacity: 1,
                  x : 0
                }}
                viewport={{once:true}}
                className="text-md sm:w-[65%] lg:w-[55%] sm:text-lg md:text-xl lg:text-2xl text-center sm:text-right mt-4 max-w-full sm:max-w-[90%] md:max-w-[80%] ml-6">
            <Typography variant='h6' color = "primary"  textAlign="right">
            <Trans
          i18nKey="personal_review_A"
         components={{ 1:  <span style= {{color: theme.palette.accent.main}}/>}}
         />
            </Typography>
          </motion.div >
        
        
        </div>

        </section>
        </Container>
            </StyledReview>
      </>
    )
  }
  
  export default WhatPeopleThink
  