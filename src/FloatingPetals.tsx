import { motion } from "framer-motion";
import { useMemo } from "react";


const PETAL_COUNT = window.innerWidth < 768 ? 18 : 35;

export default function FloatingPetals() {
    const petals = useMemo(() => {
        return Array.from({ length: PETAL_COUNT }).map(() => ({
          startX: Math.random() * window.innerWidth,
          drift: Math.random() * 200 - 100,
          duration: 8 + Math.random() * 6,
          delay: Math.random() * 2,
          rotateStart: Math.random() * 180,
          rotateEnd: Math.random() > 0.5 ? 360 : -360,
          scale: 0.6 + Math.random() * 0.8,
          flip: Math.random() > 0.5,
        }));
      }, []);

  return (
    <div className="petals-container">
      {petals.map((_, i) => {
        const startX = Math.random() * window.innerWidth;
        const drift = Math.random() * 200 - 100;
        const duration = 8 + Math.random() * 6;
        const delay = Math.random() * 2;
        const rotateStart = Math.random() * 180;
        const rotateEnd = rotateStart + (Math.random() > 0.5 ? 360 : -360);
        const scale = 0.6 + Math.random() * 0.8;

        return (
          <motion.img
            key={i}
            src="/petal2.png" // <-- YOUR PNG
            className="petal-img"
            initial={{
              y: -100,
              x: startX,
              rotate: rotateStart,
              scale,
              opacity: 0,
            }}
            animate={{
              y: window.innerHeight + 200,
              x: startX + drift,
              rotate: rotateEnd,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transform: Math.random() > 0.5 ? "scaleX(-1)" : "scaleX(1)",
            }}
          />
        );
      })}
    </div>
  );
}