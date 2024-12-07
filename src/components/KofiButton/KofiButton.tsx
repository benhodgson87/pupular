import { useTranslation } from "react-i18next";
import { LINK_EXT_BH_KOFI } from "~/config/links";

const KofiButton = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "KofiButton" });

  return (
    <a href={LINK_EXT_BH_KOFI} target="_blank">
      <img
        className="border-0 h-7"
        src="https://storage.ko-fi.com/cdn/kofi1.png?v=6"
        alt={t("altText")}
      />
    </a>
  );
};

export { KofiButton };
