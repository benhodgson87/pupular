import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGameContext } from "~/context/GameContext";
import { scoreChangeAnimation } from "./Score.motion";

const Score = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "Score" });

  const { currentScore } = useGameContext();

  return (
    <div className="text-white text-center">
      <h2 className="text-xs">{t("score")}</h2>
      <AnimatePresence mode="popLayout">
        <motion.strong
          key={currentScore}
          className="text-xl block"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={scoreChangeAnimation}
        >
          {currentScore}
        </motion.strong>
      </AnimatePresence>
    </div>
  );
};

export { Score };
