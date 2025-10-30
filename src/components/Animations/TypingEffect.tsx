import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  delay?: number;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  delay = 0, 
  speed = 50 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  return (
    <span>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </span>
  );
};

export default TypingEffect;