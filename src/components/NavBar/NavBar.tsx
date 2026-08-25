import { AppBar, MenuItem, styled, Toolbar, Typography } from "@mui/material"
import { Link } from "react-scroll"; // Importa o Link do react-scroll para rolagem suave
import { useTranslation } from 'react-i18next'


const NavBar = () =>{  //uma notação diferente para function 
  const {t} = useTranslation();


    const StyledToolBar = styled(Toolbar)(() => ({
      maxWidth:"100%",
      display: "flex",
      justifyContent: "space-evenly",
      backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat',
           backgroundPosition: 'center',
           width: "100%",
        
       
  }))

    return (
      <>
        <AppBar position="absolute">
            <StyledToolBar>
                <MenuItem > 
                <Link to="sobre" smooth={true} duration={300} >

               < Typography variant="h5"> 
                {t("navBarAbout")}
              </Typography>
                </Link>
                </MenuItem>

                <MenuItem >
                <Link to="experiences" smooth={true} duration={250}>

               < Typography variant="h5">
                {t("navBarExperience")}
              </Typography>
                </Link>
                </MenuItem>

                <MenuItem >
                <Link to="projetos" smooth={true} duration={200}>
                < Typography variant="h5">
                {t("navBarProjects")}
                </Typography>
                </Link>
                </MenuItem>

                <MenuItem>
                <Link to="footer" smooth={true} duration={100}>
                < Typography variant="h5">
                {t("navBarContact")}
                </Typography>
                </Link>
                </MenuItem>
            </StyledToolBar>
        </AppBar>      
      </>
    )
  }
  
  export default NavBar
  