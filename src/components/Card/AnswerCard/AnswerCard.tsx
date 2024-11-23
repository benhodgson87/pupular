import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { howManyAnimation, nextRoundAnimation } from "./AnswerCard.motion";

type Props = {
  correct: boolean;
  name: string;
  count: number;
  handleNextRound: () => void;
};

const AnswerCard = ({ correct, name, count, handleNextRound }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "AnswerCard" });

  return (
    <div className="flex flex-col items-center w-full p-6 text-center">
      <h2 className="font-cherry-bomb-one mb-5 text-white text-5xl">
        {correct ? t("correct") : t("incorrect")}
      </h2>
      <motion.p
        key="howMany"
        initial="initial"
        animate="animate"
        variants={howManyAnimation}
        className="text-2xl leading-relaxed text-white mb-6"
      >
        <Trans
          i18nKey="AnswerCard.howManyCount"
          count={count}
          values={{ name }}
          components={[<strong />]}
        ></Trans>
      </motion.p>
      <motion.button
        initial="initial"
        animate="animate"
        variants={nextRoundAnimation}
        className="w-full max-w-48 bg-orange-400 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-400 text-white text-xl font-bold py-4 px-5 rounded-full hover:scale-105"
        onClick={handleNextRound}
      >
        {t("nextRound")}
      </motion.button>
    </div>
  );
};

export { AnswerCard };
