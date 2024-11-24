import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// @ts-expect-error - React Fitty types don't work
import { Textfit } from "react-textfit";

type Props = {
  name: string;
  avatar?: string;
  answers: Array<number>;
  handleAnswer: (answer: number) => void;
};

const motivators = [
  "motivators.hmmmmm",
  "motivators.howManyPeople",
  "motivators.notoriousDog",
  "motivators.trendyDogName",
  "motivators.classicCanineName",
  "motivators.crowdPleaser",
  "motivators.furryFriends",
  "motivators.dogParkFavorite",
  "motivators.theTopDog",
];

const PlayCard = ({ name, avatar, answers, handleAnswer }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "PlayCard" });

  const [currentMotivator, setCurrentMotivator] = useState<string | null>(null);

  useEffect(() => {
    const selectedMotivator =
      motivators[Math.floor(Math.random() * motivators.length)];

    setCurrentMotivator(selectedMotivator);
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-white dark:bg-gray-700 bg-opacity-90 border-2 border-white dark:border-gray-600 border-solid rounded-lg shadow-lg p-6">
      {avatar ? (
        <img
          className="h-40 w-40 rounded-full object-cover mb-4"
          src={avatar}
          alt="A picture of a dog"
        />
      ) : null}
      <div className="text-center w-full mb-6 p-2">
        <h2
          className={classNames(
            "font-cherry-bomb-one text-xl font-semibold mb-6 transition-all",
            { uppercase: name.length === 2 },
          )}
        >
          <Textfit mode="single" min={24} max={48}>
            {name}
          </Textfit>
        </h2>
        <p>
          {currentMotivator
            ? t(currentMotivator, {
                name,
              })
            : null}
        </p>
      </div>
      <section className="w-full text-center">
        <h2 className="text-xs font-bold mb-3">{t("answerTitle")}</h2>
        <div className="flex w-full justify-between items-center gap-5">
          {answers.map((answer, i) => (
            <button
              key={answer}
              className={classNames(
                "w-full hover:bg-green-500 text-white text-xl font-bold py-4 px-5 rounded-full transition duration-200 transform hover:scale-105",
                {
                  "bg-blue-500 dark:bg-blue-600": i === 0,
                  "bg-blue-400 dark:bg-blue-600": i === 1,
                  "bg-blue-600 dark:bg-blue-600": i === 2,
                },
              )}
              onClick={() => handleAnswer(answer)}
            >
              {new Intl.NumberFormat("en-US").format(answer)}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export { type Props, PlayCard };
