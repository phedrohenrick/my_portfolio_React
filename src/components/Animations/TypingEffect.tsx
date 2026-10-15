import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  delay?: number;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, delay = 0, speed = 50 }) => {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (reduce || count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), count === 0 ? delay : speed);
    return () => clearTimeout(timer);
  }, [count, text, delay, speed, reduce]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      {!reduce && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypingEffect;
