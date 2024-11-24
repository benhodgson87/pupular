import classNames from "classnames";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { CountdownButton } from "~/components/CountdownButton";
import { TIME_BETWEEN_ROUND } from "~/config/game";
import { howManyAnimation, nextRoundAnimation } from "./AnswerCard.motion";
import { useEffect } from "react";

type Props = {
  result: {
    correct: boolean;
    name: string;
    count: number;
  };
  handleNextRound: (method: "AUTO" | "MANUAL") => void;
};

const AnswerCard = ({ result, handleNextRound }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "AnswerCard" });

  useEffect(() => {
    if (result?.count) {
      const nextRoundTimer = setTimeout(() => {
        handleNextRound("AUTO");
      }, TIME_BETWEEN_ROUND * 1000);

      return () => clearTimeout(nextRoundTimer);
    }
  }, [result]);

  return (
    <div className="flex flex-col items-center w-full p-6 text-center">
      <h2 className="font-cherry-bomb-one mb-5 text-white text-5xl">
        {result.correct ? t("correct") : t("incorrect")}
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
          count={result.count}
          values={{ name: result.name }}
          components={[
            <strong
              className={classNames({ uppercase: result.name.length === 2 })}
            />,
          ]}
        ></Trans>
      </motion.p>
      <motion.div
        initial="initial"
        animate="animate"
        variants={nextRoundAnimation}
      >
        <CountdownButton
          countdown={TIME_BETWEEN_ROUND}
          onClick={() => handleNextRound("MANUAL")}
        >
          {t("nextRound")}
        </CountdownButton>
      </motion.div>
    </div>
  );
};

export { AnswerCard };
