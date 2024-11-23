import { RemixBrowser } from "@remix-run/react";
import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Fetch from "i18next-fetch-backend";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { defaultNS, fallbackLng, supportedLngs } from "~/config/i18n";

async function main() {
	// eslint-disable-next-line import/no-named-as-default-member
	await i18next
		.use(initReactI18next)
		.use(I18nextBrowserLanguageDetector)
		.use(Fetch)
		.init({
			defaultNS,
			fallbackLng,
			supportedLngs,
			detection: {
				order: ["htmlTag"],
				caches: [],
			},
			backend: {
				loadPath: "/api/locales?lng={{lng}}&ns={{ns}}",
			},
		});

	startTransition(() => {
		hydrateRoot(
			document,
			<I18nextProvider i18n={i18next}>
				<StrictMode>
					<RemixBrowser />
				</StrictMode>
			</I18nextProvider>,
		);
	});
}

main().catch((error) => console.error(error));
