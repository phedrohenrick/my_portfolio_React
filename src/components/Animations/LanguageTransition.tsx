import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface LanguageTransitionProps {
  children: ReactNode;
  language: string;
}

const LanguageTransition: React.FC<LanguageTransitionProps> = ({ children, language }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageTransition;