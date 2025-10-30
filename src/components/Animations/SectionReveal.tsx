import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
  duration?: number;
}

const SectionReveal: React.FC<SectionRevealProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  stagger = false,
  duration = 0.6
}) => {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.2 : 0,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      ...directions[direction]
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={stagger ? containerVariants : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;