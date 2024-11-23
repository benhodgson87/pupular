import type { MetaFunction } from "@netlify/remix-runtime";
import { Game } from "~/components/Game";
import { PlayFooter } from "~/components/PlayFooter";

export const meta: MetaFunction = () => {
  return [
    { title: "Pupular" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Game />
      <footer className="flex flex-1 flex-end justify-center">
        <PlayFooter />
      </footer>
    </div>
  );
}
