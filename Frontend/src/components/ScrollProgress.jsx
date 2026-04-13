import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-600 to-emerald-600 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}