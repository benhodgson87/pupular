import classNames from "classnames";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CountdownButton } from "~/components/CountdownButton";
import { TIME_BETWEEN_ROUND } from "~/config/game";
import {
  howManyAnimation,
  nextRoundAnimation,
  singleDogDetailAnimation,
} from "./AnswerCard.motion";

type Props = {
  result: {
    correct: boolean;
    count: number;
    name: string;
    genders: {
      M?: number;
      F?: number;
    };
    breeds: Record<string, number>;
  };
  handleNextRound: (method: "AUTO" | "MANUAL") => void;
};

const getCorrectSingleDogMessage = (breed: string, gender: string) => {
  const vowels = ["A", "E", "I", "O", "U"];
  const firstCharacter = Array.from(breed)[0];

  switch (gender) {
    case "M":
      if (vowels.includes(firstCharacter)) return "singleDogDetailAnM";
      return "singleDogDetailM";
    case "F":
    default:
      if (vowels.includes(firstCharacter)) return "singleDogDetailAnF";
      return "singleDogDetailF";
  }
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
        />
      </motion.p>
      {result.count === 1 &&
      Object.keys(result.breeds).length > 0 &&
      Object.keys(result.genders).length > 0 ? (
        <motion.p
          className="flex items-center justify-center mb-8"
          initial="initial"
          animate="animate"
          variants={singleDogDetailAnimation}
        >
          <img
            src="/icons/bone.svg"
            className="mr-2"
            width={20}
            alt="Bone icon"
          />
          {t(
            getCorrectSingleDogMessage(
              Object.keys(result.breeds)[0],
              Object.keys(result.genders)[0]
            ),
            { breed: Object.keys(result.breeds)[0] }
          )}
        </motion.p>
      ) : null}
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
