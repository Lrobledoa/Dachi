import { motion } from "framer-motion";
import { useState } from "react";

export default function SurpriseGift() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  
    // Open blank tab immediately (this is allowed)
    const newTab = window.open("", "_blank");
  
    // After animation delay, redirect it
    setTimeout(() => {
      if (newTab) {
        newTab.location.href = "https://www.zara.com/fr/fr/gift-card/522520674978/share-details?hash=50c70e2c-72b9-4866-b1af-6372a4705359";
      }
    }, 1200);
  };

  return (
    <motion.div
      className="surprise-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
    >
      {!clicked ? (
        <>
          <motion.img
            src="/gift.png"
            className="gift-box"
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.08 }}
            onClick={handleClick}
          />
          <p className="gift-text">Click for a surprise</p>
        </>
      ) : (
        <motion.p
          className="gift-opening"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Let me spoil you a little...
        </motion.p>
      )}
    </motion.div>
  );
}