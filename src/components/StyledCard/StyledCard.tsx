import styled from "@emotion/styled"
import { ReactNode } from "react"
import { Card } from "@mui/material"

interface StyledCardSkillProps{
  children: ReactNode
}

const StyledCardSkill: React.FC<StyledCardSkillProps> = ({children}) =>{  //uma notação diferente para function 


  const StyledCard = styled(Card)(({ }) => ({
          backgroundColor: "rgba(1, 44, 50, 1)",
          padding: "24px",
          color: "#ffffff",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          width: "100%",  
          maxWidth: "100%",
          height: "auto",  
          display: "flex",
          flexDirection: "column",
          
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",  
        
          '@media (max-width: 768px)': {
            padding: "16px", // Reduz o padding para mais espaço interno
            maxWidth: "100%"
        },
    
        '@media (max-width: 480px)': {
            padding: "12px", // Reduz ainda mais o padding
            maxWidth: "100%",
            
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
  



