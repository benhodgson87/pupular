import { useTranslation } from "react-i18next";
import { useGameContext } from "~/context/GameContext";

const timeFormatter = (time: number) =>
  new Date(time * 1000)
    .toISOString()
    .slice(time > 59 ? 15 : time > 9 ? 17 : 18, 19);

const Timer = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "Timer" });

  const { timeRemaining } = useGameContext();

  return (
    <div className="text-white text-center">
      <h2 className="text-xs">{t("remaining")}</h2>
      <strong className="text-xl">{timeFormatter(timeRemaining)}</strong>
    </div>
  );
};

export { Timer };
