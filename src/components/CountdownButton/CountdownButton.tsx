import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { countdownButtonAnimation } from "./Countdown.motion";

type Props = PropsWithChildren<{
  countdown?: number;
  onClick: () => void;
}>;

const CountdownButton = ({ countdown = 4, onClick, children }: Props) => {
  return (
    <motion.button
      className="w-full max-w-48 bg-orange-400 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-400 text-white text-xl font-bold py-4 px-5 rounded-full transition duration-200 transform hover:scale-105"
      onClick={onClick}
      initial="initial"
      animate="animate"
      variants={countdownButtonAnimation(countdown)}
    >
      {children}
    </motion.button>
  );
};

export { CountdownButton };
