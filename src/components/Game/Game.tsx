"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card } from "~/components/Card";
import { GameHeader } from "~/components/GameHeader";
import { GameOver } from "~/components/GameOver";
import { GameContextProvider, useGameContext } from "~/context/GameContext";
import { gameOverAnimation } from "./Game.motion";

const WrappedGame = () => {
  const { currentRound, isGameOver } = useGameContext();

  return (
    <AnimatePresence mode="wait">
      {isGameOver ? (
        <motion.div
          className="w-full text-center"
          key="gameOver"
          initial="initial"
          animate="animate"
          variants={gameOverAnimation}
        >
          <GameOver />
        </motion.div>
      ) : currentRound ? (
        <motion.div key="card" exit={{ scale: 0, opacity: 0 }}>
          <Card key={currentRound} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const Game = () => (
  <GameContextProvider>
    <WrappedGame />
  </GameContextProvider>
);

export { Game };
