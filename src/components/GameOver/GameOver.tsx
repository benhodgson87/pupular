import { useTranslation } from "react-i18next";

type Props = {
  score: number;
};

const GameOver = ({ score }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "GameOver" });

  return (
    <>
      <h1 className="font-cherry-bomb-one text-white text-5xl">
        {t("gameOver")}
      </h1>
      <p className="text-white text-2xl">{t("roundScore", { score })}</p>
    </>
  );
};

export { GameOver };
