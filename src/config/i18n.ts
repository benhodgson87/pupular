import { serverOnly$ } from "vite-env-only/macros";
import enUsTranslation from "~/locales/en-US";

export const supportedLngs = ["en-US"];
export const fallbackLng = "en-US";

export const defaultNS = "translation";

export const resources = serverOnly$({
	"en-US": { translation: enUsTranslation },
});
