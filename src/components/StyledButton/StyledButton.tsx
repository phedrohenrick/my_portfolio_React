import theme from "../../theme"
import { ReactNode} from "react"
import { motion } from "framer-motion";

interface StyledButtonProps{
    children: ReactNode
    onClick: () => void
}

const StyledButton: React.FC<StyledButtonProps> = ({children, onClick}) => {
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    idle: { x: 0 },
    hover: { 
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      style={{
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.primary.light}`,
        borderRadius: "3px",
        padding: "4px",
        width: "100%",
        color: "#dfe8e8",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <motion.div
        variants={iconVariants}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        {children}
      </motion.div>
      
      {/* Efeito de ondulação no hover */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        whileHover={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, rgba(230, 126, 34, 0.3) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }}
      />
    </motion.button>
  );
};

export default StyledButton
  
