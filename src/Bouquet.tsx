import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const tulips = [
  "/tulip1.png",
  "/tulip2.png",
  "/tulip3.png",
  "/tulip4.png",
];

export default function Bouquet() {
  const [showRibbon, setShowRibbon] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRibbon(true);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  // Bouquet structure (top wide → bottom narrow)
  const structure = [6, 5, 4, 3, 2]; 
  let flowerIndex = 0;

  return (
    <div className="bouquet-container">
      {structure.map((count, row) =>
        Array.from({ length: count }).map((_, col) => {
          const tulipSrc = tulips[flowerIndex % tulips.length];
          flowerIndex++;

          const totalWidth = (count - 1) * 60;
          const x = col * 60 - totalWidth / 2;

          const y = row * 55;

          // slight inward tilt for realism
          const tilt = (col - count / 2) * 6;

          return (
            <motion.img
              key={`${row}-${col}`}
              src={tulipSrc}
              className="bouquet-flower"
              initial={{
                x: Math.random() * 800 - 400,
                y: 400,
                scale: 0,
                opacity: 0,
                rotate: Math.random() * 180,
              }}
              animate={{
                x,
                y,
                scale: 1,
                opacity: 1,
                rotate: tilt,
              }}
              transition={{
                duration: 1.1,
                delay: flowerIndex * 0.06,
                ease: "easeOut",
              }}
              style={{
                zIndex: 20 + row,
              }}
            />
          );
        })
      )}

      {showRibbon && (
        <motion.img
          src="/ribbon.png"
          className="bouquet-ribbon"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
        />
      )}
    </div>
  );
}