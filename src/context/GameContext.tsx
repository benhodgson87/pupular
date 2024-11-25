import { useLoaderData } from "@remix-run/react";
import cookies from "js-cookie";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchDog } from "~/api";
import { DEFAULT_GAME_TIME, HIGH_SCORE_COOKIE } from "~/config/game";
import { loader } from "~/routes/_index";

type NextRoundMethod = "AUTO" | "MANUAL";
type PlayState = "START" | "PLAYING" | "END";

type ProviderProps = {
  children?: ReactNode | undefined;
};

type CurrentDog = {
  id: string;
  name: string;
  answers: Array<number>;
  avatar?: string | null;
};

type GameContextType = {
  playState: PlayState;
  currentDog?: CurrentDog;
  currentRound: number;
  currentScore: number;
  timeRemaining: number;
  handleNewGame: () => void;
  handleNextRound: (method: NextRoundMethod) => void;
  handleCorrectAnswer: () => void;
  handleIncorrectAnswer: () => void;
  handleReplay: () => void;
};

const defaultPlayState = "START";
const defaultCurrentRound = 1;
const defaultCurrentScore = 0;
const defaultTimeRemaining = DEFAULT_GAME_TIME;

const GameContext = createContext<GameContextType>({
  playState: defaultPlayState,
  currentScore: defaultCurrentScore,
  currentDog: undefined,
  currentRound: defaultCurrentRound,
  timeRemaining: defaultTimeRemaining,
  handleNewGame: () => {
    console.error("`handleNewGame` run with initialiser");
  },
  handleNextRound: () => {
    console.error("`handleNextRound` run with initialiser");
  },
  handleCorrectAnswer: () => {
    console.error("`handleCorrectAnswer` run with initialiser");
  },
  handleIncorrectAnswer: () => {
    console.error("`handleIncorrectAnswer` run with initialiser");
  },
  handleReplay: () => {
    console.error("`handleRestart` run with initialiser");
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
  const loaderData = useLoaderData<typeof loader>();

  const [playState, setPlayState] = useState<PlayState>(defaultPlayState);
  const [currentRound, setCurrentRound] = useState(defaultCurrentRound);
  const [currentScore, setCurrentScore] = useState(defaultCurrentScore);
  const [currentDog, setCurrentDog] = useState<CurrentDog | undefined>(
    loaderData.initialCurrentDog
  );
  const [timeRemaining, setTimeRemaining] = useState(defaultTimeRemaining);

  useEffect(() => {
    const fetcher = async () => {
      if (playState === "PLAYING") {
        const resp = await fetchDog();
        if (!resp) return;

        return setCurrentDog(resp);
      }
    };

    fetcher();
  }, [currentRound]);

  useEffect(() => {
    let gameTimer: NodeJS.Timeout | undefined;

    if (playState === "PLAYING") {
      gameTimer = setInterval(() => {
        setTimeRemaining((current) => (current > 0 ? current - 1 : 0));
      }, 1000);

      return () => clearInterval(gameTimer);
    }
  }, [playState]);

  useEffect(() => {
    if (playState === "PLAYING" && timeRemaining === 0) handleGameOver();
  }, [timeRemaining, playState]);

  const handleNewGame = () => {
    setPlayState("PLAYING");

    gtag("event", "play_start", {
      high_score: loaderData.highScore || 0,
    });
  };

  const handleReplay = () => {
    setCurrentDog(undefined);
    setTimeRemaining(defaultTimeRemaining);
    setCurrentRound(defaultCurrentRound);
    setCurrentScore(defaultCurrentScore);
    setPlayState("PLAYING");

    gtag("event", "play_replay", {
      high_score: loaderData.highScore || 0,
    });
  };

  const handleNextRound = (method: NextRoundMethod = "AUTO") => {
    setCurrentDog(undefined);
    setCurrentRound((prev) => prev + 1);

    gtag("event", "play_next_round", {
      method,
      round: currentRound + 1,
      score: currentScore,
    });
  };

  const handleCorrectAnswer = () => {
    setCurrentScore((prev) => prev + 1);
    gtag("event", "answer_correct", {
      round: currentRound,
      score: currentScore + 1,
    });
  };

  const handleIncorrectAnswer = () => {
    gtag("event", "answer_incorrect", {
      round: currentRound,
      score: currentScore,
    });
  };

  const handleGameOver = () => {
    setPlayState("END");
    gtag("event", "play_end", {
      rounds: currentRound,
      score: currentScore,
      high_score: loaderData.highScore || 0,
    });

    if (!loaderData.highScore || currentScore > loaderData.highScore) {
      cookies.set(HIGH_SCORE_COOKIE, String(currentScore), {
        sameSite: "Strict",
      });
      gtag("event", "unlock_achievement", {
        type: "high_score",
        score: currentScore,
        level: currentRound,
      });
    }
  };

  const context = {
    playState,
    currentDog,
    currentRound,
    currentScore,
    timeRemaining,
    handleNewGame,
    handleReplay,
    handleNextRound,
    handleCorrectAnswer,
    handleIncorrectAnswer,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider, useGameContext };
