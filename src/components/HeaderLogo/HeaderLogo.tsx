import { AnimatePresence, motion } from "framer-motion";
import { useGameContext } from "~/context/GameContext";
import { logoPresenceAnimation } from "./HeaderLogo.motion";

const HeaderLogo = () => {
  const { playState } = useGameContext();

  return (
    <AnimatePresence>
      {playState === "PLAYING" ? (
        <motion.img
          className="text-white text-center"
          src="./logo.svg"
          alt="Pupularity"
          width={160}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={logoPresenceAnimation}
        />
      ) : null}
    </AnimatePresence>
  );
};

export { HeaderLogo };
