import { AnimatePresence, motion } from "framer-motion";
import { Card } from "~/components/Card";
import { GameOver } from "~/components/GameOver";
import { useGameContext } from "~/context/GameContext";
import { gameOverAnimation } from "./Game.motion";

const Game = () => {
  const { currentDog, isGameOver } = useGameContext();

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
      ) : currentDog?.id ? (
        <motion.div key="card" exit={{ scale: 0, opacity: 0 }}>
          <Card key={currentDog.id} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { Game };
