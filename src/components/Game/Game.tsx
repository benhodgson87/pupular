"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "~/components/Card";
import { Score } from "~/components/Score";
import { DEFAULT_GAME_TIME } from "~/config/game";
import { GameOver } from "../GameOver";
import { Timer } from "../Timer";
import { gameOverAnimation } from "./Game.motion";

type CurrentDog = {
  id: string;
  name: string;
  answers: Array<number>;
  avatar?: string;
};

const Game = () => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState<CurrentDog>();
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/dog`, { cache: "no-store" }).then((res) => res.json()),
      fetch("https://dog.ceo/api/breeds/image/random")
        .then((res) => res.json())
        .catch(() => null),
    ]).then(([dog, picture]) => {
      console.log(dog);
      setCurrent({
        ...dog,
        avatar: picture.message || null,
      });
    });
  }, [round]);

  const handleNextRound = () => {
    setCurrent(undefined);
    setRound((prev) => prev + 1);
  };

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 1);
  };

  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_GAME_TIME);
  useEffect(() => {
    let gameTimer: NodeJS.Timeout | undefined;

    gameTimer = setInterval(() => {
      setTimeRemaining((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearTimeout(gameTimer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) setIsGameOver(true);
  }, [timeRemaining]);

  return (
    <>
      <header className="flex-1 w-full max-w-96">
        <div className="w-full grid grid-cols-4 grid-rows-1 gap-4">
          <div className="flex flex-row items-center justify-center p-2">
            <Timer timeRemaining={timeRemaining} />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <img src="./logo.svg" width={160} height={24} alt="Pupularity" />
          </div>
          <div className="col-start-4 flex flex-row items-center justify-center p-2">
            <Score score={score} />
          </div>
        </div>
      </header>
      <main className="w-full max-w-96 p-4">
        <AnimatePresence mode="wait">
          {isGameOver ? (
            <motion.div
              className="w-full text-center"
              key="gameOver"
              initial="initial"
              animate="animate"
              variants={gameOverAnimation}
            >
              <GameOver score={score} />
            </motion.div>
          ) : current ? (
            <motion.div key="card" exit={{ scale: 0, opacity: 0 }}>
              <Card
                key={round}
                {...current}
                handleNextRound={handleNextRound}
                handleCorrectAnswer={handleCorrectAnswer}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </>
  );
};

export { Game };
