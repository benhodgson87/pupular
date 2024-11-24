import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_GAME_TIME } from "~/config/game";

type ProviderProps = {
  children?: ReactNode | undefined;
};

type GameContextType = {
  currentDog?: CurrentDog;
  currentRound: number;
  currentScore: number;
  isGameOver: boolean;
  timeRemaining: number;
  handleNextRound: () => void;
  handleCorrectAnswer: () => void;
};

type CurrentDog = {
  id: string;
  name: string;
  answers: Array<number>;
  avatar?: string;
};

const defaultCurrentRound = 1;
const defaultCurrentScore = 0;
const defaultIsGameOver = false;
const defaultTimeRemaining = DEFAULT_GAME_TIME;

const GameContext = createContext<GameContextType>({
  currentScore: defaultCurrentScore,
  currentDog: undefined,
  currentRound: defaultCurrentRound,
  isGameOver: defaultIsGameOver,
  timeRemaining: defaultTimeRemaining,
  handleNextRound: () => {
    console.error("`handleNextRound` run with initialiser");
  },
  handleCorrectAnswer: () => {
    console.error("`handleCorrectAnswer` run with initialiser");
  },
});

const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within GameContextProvider");
  }

  return context;
};

const GameContextProvider = ({ children }: ProviderProps) => {
  const [currentRound, setCurrentRound] = useState(defaultCurrentRound);
  const [currentScore, setCurrentScore] = useState(defaultCurrentScore);
  const [currentDog, setCurrentDog] = useState<CurrentDog>();
  const [isGameOver, setIsGameOver] = useState(defaultIsGameOver);
  const [timeRemaining, setTimeRemaining] = useState(defaultTimeRemaining);

  useEffect(() => {
    Promise.all([
      fetch(`/api/dog`, { cache: "no-store" }).then((res) => res.json()),
      fetch("https://dog.ceo/api/breeds/image/random")
        .then((res) => res.json())
        .catch(() => null),
    ]).then(([dog, picture]) => {
      setCurrentDog({
        ...dog,
        avatar: picture.message || null,
      });
    });
  }, [currentRound]);

  useEffect(() => {
    let gameTimer: NodeJS.Timeout | undefined;

    gameTimer = setInterval(() => {
      setTimeRemaining((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(gameTimer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) setIsGameOver(true);
  }, [timeRemaining]);

  const handleNextRound = () => {
    setCurrentDog(undefined);
    setCurrentRound((prev) => prev + 1);
  };

  const handleCorrectAnswer = () => {
    setCurrentScore((prev) => prev + 1);
  };

  const context = {
    currentDog,
    currentRound,
    currentScore,
    isGameOver,
    timeRemaining,
    handleNextRound,
    handleCorrectAnswer,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider, useGameContext };
