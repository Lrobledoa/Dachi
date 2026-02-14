import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingPetals from "./FloatingPetals";
import Bouquet from "./Bouquet";
import SurpriseGift from "./SurpriseGift";
import "./index.css";

const images = [
  "/photo1.jpeg",
  "/photo2.jpeg",
  "/photo3.jpeg",
  "/photo4.jpeg",
  "/photo5.jpeg",
  "/photo6.jpeg",
  "/photo7.jpeg",
  "/photo8.jpeg",
  "/photo9.jpeg",
  "/photo10.jpeg",
  "/photo11.jpeg",
  "/photo12.jpeg",
  "/photo13.jpeg",
  "/photo14.jpeg",
  "/photo15.jpeg",
  "/photo16.jpeg",
  "/photo17.jpeg",
];

export default function App() {
  const [stage, setStage] = useState<"home" | "envelope" | "open">("home");
  const [current, setCurrent] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    if (stage !== "home") return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, [stage]);

  /* ================= NO BUTTON MOVE ================= */
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

  /* ================= OPEN ENVELOPE ================= */
  const openEnvelope = async () => {
    setStage("open");

    if (!audioRef.current) return;

    try {
      const audio = audioRef.current;

      audio.currentTime = 0;
      audio.volume = 0;
      await audio.play();

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
              Love, este día solo sería otra festividad cliché en la que nos felicitamos sin más pensamiento.
              Sin embargo, tú haces que este día sea muy especial. Por el simple hecho de existir, de estar presente.
              De apoyarnos y siempre ver hacia delante sobre todas las cosas, de siempre buscar el bien de ambos. Además de por supuesto, incluir a la gordita.
              De siempre pensar en equipo. De poner nuestro amor primero. 
              <br></br> <br></br>
            
              Eres la razón por la que todos los días me gusta mejorar, de crecer juntos y construir un futuro del que estemos orgullosos.
              Eres mi mejor amiga, mi compañera, el amor de mi vida, mi bebé, la madre de mis hijos, mi Dachi. 
              Quiero que sigamos apoyandonos, amandonos y siempre buscando lo mejor para ambos y la gordita. 
              <br></br> Que sigamos viajando, viviendo nuevas experiencias y disfrutando de la compañia uno del otro. 
              <br></br> <br></br>
              Te amo con toda mi alma.

              <br></br> <br></br>

              Con amor, Luis.
            </p>

            {/* ===== CAROUSEL ===== */}
            <div className="carousel">
              {/* Left Arrow */}
              <button
                className="carousel-arrow left"
                onClick={() =>
                  setCurrent((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
              >
                &#10094;
              </button>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={images[current]}
                  className="carousel-img"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>

              {/* Right Arrow */}
              <button
                className="carousel-arrow right"
                onClick={() =>
                  setCurrent((prev) => (prev + 1) % images.length)
                }
              >
                &#10095;
              </button>

              {/* Dots
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${
                      index === current ? "active" : ""
                    }`}
                    onClick={() => setCurrent(index)}
                  />
                ))}
              </div> */}
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
              <p className="open-text">Click para abrir</p>
            </div>
          </motion.div>
        )}

        {/* ================= OPEN ================= */}
        {stage === "open" && (
          <motion.div
            key="open"
            className="open-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bouquet-section">
              <h1 className="love-final">
                Un detalle de nuestro amor 🩷
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