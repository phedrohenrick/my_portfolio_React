import styled from "@emotion/styled"
import { ReactNode } from "react"
import { Card } from "@mui/material"

interface StyledCardSkillProps{
  children: ReactNode
}

const StyledCardSkill: React.FC<StyledCardSkillProps> = ({children}) =>{  //uma notação diferente para function 


  const StyledCard = styled(Card)(({ }) => ({
          backgroundColor: "#d4e0e0",
          padding: "40px",
          color: "#ffffff",
          borderRadius: "25px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          width: "100%",  
          maxWidth: "500px",
          height: "auto",  
          display: "flex",
          flexDirection: "column",  
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",  
        
          '@media (max-width: 768px)': {
            padding: "20px", // Reduz o padding para mais espaço interno
            maxWidth: "90%"
        },
    
        '@media (max-width: 480px)': {
            padding: "10px", // Reduz ainda mais o padding
            maxWidth: "100%",
            flexWrap: "wrap"  // Permite que os itens quebrem linha em telas pequenas
        },
          
        }));

    return (
      <>
        <StyledCard className="p-50">
          {children}
        </StyledCard>
      </>
    )
  }
  
  export default StyledCardSkill
  