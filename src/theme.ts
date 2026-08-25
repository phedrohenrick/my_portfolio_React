import { createTheme, responsiveFontSizes } from "@mui/material"
import './App.css';

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

let theme = createTheme({
    palette: {
      primary: {
        main: "#012c32",
      },
      secondary: {
        main: "#fbf5df",
      },
      accent: {
        main: "#E67E22",
      },
    },

    typography: {
        fontFamily: '"Montserrat", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        h5: {
          fontSize: "1.4rem",
          fontWeight: 500,
        },
        h6: {
          fontSize: "1.1rem",
          fontWeight: 400,
        },
        body1: {
          fontSize: "1.4rem",
        },
        body2: {
          fontSize: "1rem",
          fontWeight: 400,
        },
        
      
    },
  });

  theme = responsiveFontSizes(theme);
  export default theme
