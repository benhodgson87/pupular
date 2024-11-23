import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnswerCard } from "./AnswerCard";
import { answerCardAnimation, playCardEnterAnimation } from "./Card.motion";
import { PlayCard } from "./PlayCard";

type Props = {
  id: string;
  name: string;
  answers: Array<number>;
  avatar?: string;
  handleNextRound: () => void;
  handleCorrectAnswer: () => void;
};

type ResultState = {
  correct: boolean;
  count: number;
  name: string;
  genders: {
    M?: number;
    F?: number;
  };
};

const SHOW_RESULT_SCREEN_FOR = 2500;

const Card = ({
  id,
  name,
  answers,
  avatar,
  handleNextRound,
  handleCorrectAnswer,
}: Props) => {
  const [result, setResult] = useState<ResultState>();

  const handleAnswer = async (answer: number) => {
    const data = await fetch(`/api/dog/${id}`, {
      method: "POST",
      body: JSON.stringify({ answer }),
    });
    const outcome = await data.json();

    if (outcome.correct) handleCorrectAnswer();
    setResult(outcome as ResultState);
  };

  useEffect(() => {
    if (result?.count) {
      const nextRoundTimer = setTimeout(() => {
        handleNextRound();
      }, SHOW_RESULT_SCREEN_FOR);

      return () => clearTimeout(nextRoundTimer);
    }
  }, [result]);

  return (
    <AnimatePresence mode="popLayout">
      {!result ? (
        <motion.div
          key="play"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={playCardEnterAnimation}
        >
          <PlayCard
            name={name}
            avatar={avatar}
            answers={answers}
            handleAnswer={handleAnswer}
          />
        </motion.div>
      ) : (
        <motion.div
          key="answer"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={answerCardAnimation}
        >
          <AnswerCard
            correct={result.correct}
            count={result.count}
            name={result.name}
            genders={result.genders}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Card };
