import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { scoreChangeAnimation } from "./Score.motion";

type Props = {
  score?: number;
};

const Score = ({ score = 0 }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "Score" });

  return (
    <div className="text-white text-center">
      <h2 className="text-xs">{t("score")}</h2>
      <AnimatePresence mode="popLayout">
        <motion.strong
          key={score}
          className="text-xl block"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={scoreChangeAnimation}
        >
          {score}
        </motion.strong>
      </AnimatePresence>
    </div>
  );
};

export { Score };
