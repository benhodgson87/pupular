import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGameContext } from "~/context/GameContext";
import { scoreChangeAnimation, scorePresenceAnimation } from "./Score.motion";

const Score = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "Score" });

  const { playState, currentScore } = useGameContext();

  return (
    <AnimatePresence>
      {playState === "PLAYING" ? (
        <motion.div
          key="score"
          className="text-white text-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={scorePresenceAnimation}
        >
          <h2 className="text-xs">{t("score")}</h2>
          <AnimatePresence mode="popLayout">
            <motion.strong
              key={currentScore}
              className="text-xl block"
              animate="animate"
              exit="exit"
              variants={scoreChangeAnimation}
            >
              {currentScore}
            </motion.strong>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { Score };
