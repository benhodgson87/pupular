import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGameContext } from "~/context/GameContext";
import { timerPresenceAnimation } from "./Timer.motion";

const timeFormatter = (time: number) =>
  new Date(time * 1000)
    .toISOString()
    .slice(time > 59 ? 15 : time > 9 ? 17 : 18, 19);

const Timer = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "Timer" });

  const { playState, timeRemaining } = useGameContext();

  return (
    <AnimatePresence>
      {playState === "PLAYING" ? (
        <motion.div
          key="timer"
          className="text-white text-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={timerPresenceAnimation}
        >
          <h2 className="text-xs">{t("remaining")}</h2>
          <strong className="text-xl">{timeFormatter(timeRemaining)}</strong>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { Timer };
