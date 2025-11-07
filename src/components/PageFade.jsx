import { motion } from "motion/react";

export function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0.85 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
