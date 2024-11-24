import { useTranslation } from "react-i18next";
import { useGameContext } from "~/context/GameContext";

const GameStart = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "GameStart" });

  const { handleNewGame } = useGameContext();

  return (
    <div className="flex flex-col items-center text-center">
      <img src="./logo.svg" width={240} alt="Pupularity" className="mb-10" />
      <p className="text-white text-xl font-bold mb-6">
        New York City publishes open data of licensed dogs in the city,
        including their names.
      </p>
      <p className="text-white text-xl mb-10">
        See if you can guess how many dogs have the same name!
      </p>
      <button
        className="w-full max-w-96 bg-orange-500 dark:bg-orange-700 hover:bg-orange-300 dark:hover:bg-orange-400 text-white text-xl font-bold py-4 px-5 rounded-full transition duration-200 transform hover:scale-105"
        onClick={handleNewGame}
      >
        {t("startGame")}
      </button>
    </div>
  );
};

export { GameStart };
