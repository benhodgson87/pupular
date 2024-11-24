import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TIME_BETWEEN_ROUND } from "~/config/game";
import { useGameContext } from "~/context/GameContext";
import { AnswerCard } from "./AnswerCard";
import { answerCardAnimation, playCardEnterAnimation } from "./Card.motion";
import { PlayCard } from "./PlayCard";

type ResultState = {
  correct: boolean;
  count: number;
  name: string;
  genders: {
    M?: number;
    F?: number;
  };
};

const Card = () => {
  const { currentDog, handleCorrectAnswer, handleNextRound } = useGameContext();

  const [result, setResult] = useState<ResultState>();

  const handleAnswer = async (answer: number) => {
    if (!currentDog) return;

    const data = await fetch(`/api/dog/${currentDog.id}`, {
      method: "POST",
      body: JSON.stringify({ answer }),
    });
    const outcome = await data.json();

    if (outcome.correct) handleCorrectAnswer();
    setResult(outcome);
  };

  useEffect(() => {
    if (result?.count) {
      const nextRoundTimer = setTimeout(() => {
        handleNextRound();
      }, TIME_BETWEEN_ROUND * 1000);

      return () => clearTimeout(nextRoundTimer);
    }
  }, [result]);

  if (
    !currentDog ||
    !currentDog.id ||
    !currentDog.name ||
    !currentDog.avatar ||
    !currentDog.answers
  )
    return null;

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
            name={currentDog.name}
            avatar={currentDog.avatar}
            answers={currentDog.answers}
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
            handleNextRound={handleNextRound}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Card };
