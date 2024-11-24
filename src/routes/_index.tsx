import type { MetaFunction } from "@remix-run/node";
import { Game } from "~/components/Game";
import { Footer } from "~/components/Footer";
import { GameHeader } from "~/components/GameHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "Pupular" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <header className="flex-1 w-full max-w-2xl">
        <GameHeader />
      </header>
      <main className="w-full max-w-96 p-4">
        <Game />
      </main>
      <footer className="flex flex-1 flex-end justify-center">
        <Footer />
      </footer>
    </div>
  );
}
