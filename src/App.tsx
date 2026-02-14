import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingPetals from "./FloatingPetals";
import "./index.css";
import Bouquet from "./Bouquet";
import SurpriseGift from "./SurpriseGift";

const images = ["/photo1.jpeg", "/photo2.jpeg", "/photo3.jpeg","/photo4.jpeg", "/photo5.jpeg"];

export default function App() {
  const [stage, setStage] = useState<"home" | "envelope" | "open">("home");
  const [current, setCurrent] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const moveNo = () => {
    const maxX = window.innerWidth / 2 - 100;
    const maxY = window.innerHeight / 3;
  
    const x = (Math.random() - 0.5) * maxX * 2;
    const y = (Math.random() - 0.5) * maxY;
  
    setNoPos({ x, y });
  };

  const handleYes = () => {
    setStage("envelope");
  };

  const openEnvelope = async () => {
    setStage("open");
  
    if (!audioRef.current) return;
  
    try {
      const audio = audioRef.current;
  
      audio.currentTime = 0;
      audio.volume = 0; // start silent
      await audio.play();
  
      // smooth fade in
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.8) {
          vol += 0.03;
          audio.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 100);
  
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  return (
    <div className="app">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* PETALS ONLY AFTER ENVELOPE IS OPENED */}
      {stage === "open" && <FloatingPetals />}

      <AnimatePresence mode="wait">
        {/* ================= HOME ================= */}
        {stage === "home" && (
          <motion.div
            key="home"
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="title">
              A reminder of <span>our Love</span>
            </h1>

            <p className="subtitle">
              My love, every sunrise feels softer because you exist.
              Every memory we create becomes my favorite place to return to.
            </p>

            <div className="carousel">
              <motion.img
                key={current}
                src={images[current]}
                className="carousel-img"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 6, ease: "easeInOut" }}
                onAnimationComplete={() =>
                  setCurrent((prev) => (prev + 1) % images.length)
                }
              />
            </div>

            <h2 className="question glow">
              Will you be my Valentine?
            </h2>

            <div className="buttons">
              <button className="yes" onClick={handleYes}>
                Yes, of course 💖
              </button>

              <button
                className="no"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                }}
                onMouseEnter={moveNo}
              >
                Ew No
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= ENVELOPE ================= */}
        {stage === "envelope" && (
          <motion.div
            key="envelope"
            className="envelope-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="envelope" onClick={openEnvelope}>
              💌
              <p className="open-text">Click to open</p>
            </div>
          </motion.div>
        )}

        {/* ================= OPEN STAGE ================= */}
        {stage === "open" && (
          <motion.div
            key="open"
            className="open-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bouquet-section">
              <h1 className="love-final">
                Forever starts with you ❤️
              </h1>

              <Bouquet />
              <SurpriseGift />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}