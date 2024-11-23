import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRouteLoaderData,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next/react";
import i18nServer, { localeCookie } from "./modules/i18n.server";

import "./tailwind.css";
import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&family=Lexend+Deca:wght@400&family=Lexend+Deca:wght@700&display=swap",
	},
];

export const handle = { i18n: ["translation"] };

export async function loader({ request }: LoaderFunctionArgs) {
	const locale = await i18nServer.getLocale(request);
	return Response.json(
		{ locale },
		{ headers: { "Set-Cookie": await localeCookie.serialize(locale) } },
	);
}

export function Layout({ children }: { children: ReactNode }) {
	const loaderData = useRouteLoaderData<typeof loader>("root");

	return (
		<html lang={loaderData?.locale ?? "en"}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<MotionConfig reducedMotion="user">
				<body className="font-lexend-deca antialiased fixed top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 dark:from-green-950 to-blue-500 dark:to-blue-950">
					{children}
					<ScrollRestoration />
					<Scripts />
				</body>
			</MotionConfig>
		</html>
	);
}

export default function App() {
	const { locale } = useLoaderData<typeof loader>();
	useChangeLanguage(locale);
	return <Outlet />;
}
