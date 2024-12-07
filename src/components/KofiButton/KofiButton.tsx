import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { LINK_EXT_BH_KOFI } from "~/config/links";

type Props = {
  size?: "sm" | "md" | "lg";
};

const KofiButton = ({ size = "sm" }: Props) => {
  const { t } = useTranslation(undefined, { keyPrefix: "KofiButton" });

  return (
    <a href={LINK_EXT_BH_KOFI} target="_blank">
      <img
        className={classNames("border-0", {
          "h-7": size === "sm",
          "h-12": size === "md",
          "h-16": size === "lg",
        })}
        src="https://storage.ko-fi.com/cdn/kofi1.png?v=6"
        alt={t("altText")}
      />
    </a>
  );
};

export { KofiButton };
