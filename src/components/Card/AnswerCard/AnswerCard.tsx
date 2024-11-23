import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { howManyParaEnterAnimation } from "./AnswerCard.motion";

type Props = {
  correct: boolean;
  name: string;
  count: number;
  genders: { M?: number; F?: number };
};

const AnswerCard = ({ correct, name, count }: Props) => {
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
        variants={howManyParaEnterAnimation}
        className="text-xl leading-relaxed text-white"
      >
        <Trans
          i18nKey="AnswerCard.howManyCount"
          count={count}
          values={{ name }}
          components={[<strong />]}
        ></Trans>
      </motion.p>
    </div>
  );
};

export { AnswerCard };
