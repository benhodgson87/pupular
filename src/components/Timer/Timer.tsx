import { useTranslation } from "react-i18next";

type Props = {
  timeRemaining: number;
};

const timeFormatter = (time: number) =>
  new Date(time * 1000).toISOString().slice(time > 59 ? 14 : 15, 19);

const Timer = ({ timeRemaining }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "Timer" });

  return (
    <div className="text-white text-center">
      <h2 className="text-xs">{t("remaining")}</h2>
      <strong className="text-xl">{timeFormatter(timeRemaining)}</strong>
    </div>
  );
};

export { Timer };
