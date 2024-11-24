import { useTranslation } from "react-i18next";
import { useGameContext } from "~/context/GameContext";

const GameOver = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "GameOver" });

  const { currentScore, currentRound } = useGameContext();

  return (
    <>
      <h1 className="font-cherry-bomb-one text-white text-5xl">
        {t("gameOver")}
      </h1>
      <p className="text-white text-2xl">
        {t("roundScore", { score: currentScore, rounds: currentRound })}
      </p>
    </>
  );
};

export { GameOver };
