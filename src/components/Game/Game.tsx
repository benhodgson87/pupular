import { AnimatePresence, motion } from "framer-motion";
import { Card } from "~/components/Card";
import { GameOver } from "~/components/GameOver";
import { useGameContext } from "~/context/GameContext";
import {
  gameCardAnimation,
  gameOverAnimation,
  playViewAnimation,
} from "./Game.motion";
import { GameStart } from "../GameStart";

const Game = () => {
  const { playState } = useGameContext();

  return (
    <AnimatePresence mode="wait">
      {playState === "START" ? (
        <motion.div
          className="flex items-center w-full"
          key="play"
          exit="exit"
          variants={playViewAnimation}
        >
          <GameStart />
        </motion.div>
      ) : playState === "END" ? (
        <motion.div
          className="w-full text-center"
          key="gameOver"
          initial="initial"
          animate="animate"
          variants={gameOverAnimation}
        >
          <GameOver />
        </motion.div>
      ) : playState === "PLAYING" ? (
        <motion.div key="card" exit="exit" variants={gameCardAnimation}>
          <Card key="card" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { Game };
