import { useTranslation } from "react-i18next";
import { useGameContext } from "~/context/GameContext";

const GameOver = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "GameOver" });

  const { currentScore, currentRound, handleReplay } = useGameContext();

  const handleRestart = () => handleReplay();

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="font-cherry-bomb-one text-white text-5xl mb-4">
        {t("gameOver")}
      </h1>
      <p className="text-white text-2xl mb-8">
        {t("roundScore", { score: currentScore, rounds: currentRound })}
      </p>
      <button
        className="w-full max-w-48 bg-orange-500 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-400 text-white text-xl font-bold py-4 px-5 rounded-full transition duration-200 transform hover:scale-105"
        onClick={handleRestart}
      >
        {t("playAgain")}
      </button>
    </div>
  );
};

export { GameOver };
