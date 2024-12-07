import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import cookie from "cookie";
import { fetchDog } from "~/api";
import { Footer } from "~/components/Footer";
import { Game } from "~/components/Game";
import { GameHeader } from "~/components/GameHeader";
import { HIGH_SCORE_COOKIE } from "~/config/game";
import { GameContextProvider } from "~/context/GameContext";

export const meta: MetaFunction = () => {
  return [
    { title: "Pupular" },
    {
      name: "description",
      content:
        "Can you guess which dogs have the most popular names, using New York City's open dataset of real dog names?",
    },
    {
      property: "og:title",
      content: "Pupular: Let's play!",
    },
    {
      property: "og:image",
      content: "https://pupular.name/og-image.jpg",
    },
    {
      property: "twitter:title",
      content: "Pupular: Let's play!",
    },
    {
      property: "twitter:card",
      content: "summary",
    },
    {
      property: "twitter:description",
      content:
        "Can you guess which dogs have the most popular names, using New York City's open dataset of real dog names?",
    },
    {
      property: "twitter:image",
      content: "https://pupular.name/tw-summary-image.jpg",
    },
    {
      property: "twitter:creator",
      content: "@benhodgson",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: "https://pupular.name",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const parsedCookies = cookie.parse(request.headers.get("cookie") ?? "");
  const highScore = Number(parsedCookies[HIGH_SCORE_COOKIE]);

  const initialCurrentDog = await fetchDog();
  await fetch(`${process.env.API_BASE_URL}/api/dog/?warmup=true`, {
    method: "POST",
  });

  return Response.json({ highScore, initialCurrentDog });
}

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
