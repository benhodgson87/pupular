import { AnimatePresence, motion } from "framer-motion";
import { Card } from "~/components/Card";
import { GameOver } from "~/components/GameOver";
import { useGameContext } from "~/context/GameContext";
import { GameStart } from "../GameStart";
import {
  gameCardAnimation,
  gameOverAnimation,
  playViewAnimation,
} from "./Game.motion";

const Game = () => {
  const { playState } = useGameContext();

  return (
    <AnimatePresence mode="popLayout">
      {playState === "PLAYING" ? (
        <motion.div key="card" exit="exit" variants={gameCardAnimation}>
          <Card key="card" />
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
      ) : (
        <motion.div
          className="flex items-center w-full"
          key="play"
          exit="exit"
          variants={playViewAnimation}
        >
          <GameStart />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Game };
