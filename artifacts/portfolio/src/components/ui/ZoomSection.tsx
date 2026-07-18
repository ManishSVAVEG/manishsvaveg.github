import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ZoomSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.2'],
  });

  const scale   = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref}>
      <motion.div style={{ scale, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
