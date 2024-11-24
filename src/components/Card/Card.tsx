import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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
  breeds: Record<string, number>;
};

const Card = () => {
  const {
    currentDog,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    handleNextRound,
  } = useGameContext();

  const [result, setResult] = useState<ResultState>();

  const handleAnswer = async (answer: number) => {
    if (!currentDog) return;

    const data = await fetch(`/api/dog/${currentDog.id}`, {
      method: "POST",
      body: JSON.stringify({ answer }),
    });
    const outcome = await data.json();

    if (outcome.correct) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }

    setResult(outcome);
  };

  const handleAnswerTimeout = (method: "AUTO" | "MANUAL") => {
    handleNextRound(method);
    setResult(undefined);
  };

  if (!currentDog) return null;

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
          <PlayCard handleAnswer={handleAnswer} />
        </motion.div>
      ) : (
        <motion.div
          key="answer"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={answerCardAnimation}
        >
          <AnswerCard result={result} handleNextRound={handleAnswerTimeout} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Card };
