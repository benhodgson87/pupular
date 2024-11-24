import { Trans, useTranslation } from "react-i18next";
import { CURRENT_TOTAL_COUNT_EST } from "~/config/game";
import { useGameContext } from "~/context/GameContext";

const GameStart = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "GameStart" });

  const { handleNewGame } = useGameContext();

  return (
    <div className="flex flex-col items-center text-center">
      <img src="./logo.svg" width={240} alt="Pupularity" className="mb-10" />
      <Trans
        i18nKey="GameStart.intro"
        values={{ total: CURRENT_TOTAL_COUNT_EST }}
        components={[
          <p className="text-white dark:text-gray-300 text-lg font-bold mb-6" />,
          <p className="text-white dark:text-gray-300 text-xl mb-10" />,
        ]}
      />
      <button
        className="w-full max-w-96 bg-orange-500 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-400 text-white text-2xl font-bold py-4 px-5 rounded-full transition duration-200 transform hover:scale-105"
        onClick={() => handleNewGame(false)}
      >
        {t("startGame")}
      </button>
    </div>
  );
};

export { GameStart };
