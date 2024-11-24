import classNames from "classnames";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { CountdownButton } from "~/components/CountdownButton";
import { TIME_BETWEEN_ROUND } from "~/config/game";
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
          components={[
            <strong className={classNames({ uppercase: name.length === 2 })} />,
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
          onClick={handleNextRound}
        >
          {t("nextRound")}
        </CountdownButton>
      </motion.div>
    </div>
  );
};

export { AnswerCard };
