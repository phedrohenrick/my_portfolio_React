import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number };

const Reveal = ({ children, className, delay = 0 }: Props) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
