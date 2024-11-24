import type { MetaFunction } from "@remix-run/node";
import { Footer } from "~/components/Footer";
import { Game } from "~/components/Game";
import { GameHeader } from "~/components/GameHeader";
import { GameContextProvider } from "~/context/GameContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Pupular" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <GameContextProvider>
        <header className="flex-1 w-full max-w-2xl">
          <GameHeader />
        </header>
        <main className="w-full max-w-96 p-4">
          <Game />
        </main>
        <footer className="flex flex-1 flex-end justify-center">
          <Footer />
        </footer>
      </GameContextProvider>
    </div>
  );
}
