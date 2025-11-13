import { Link } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import {
  LINK_EXT_BH_BLUESKY,
  LINK_EXT_BH_PERSONAL_SITE,
  LINK_EXT_DOG_API,
  LINK_EXT_NYC_OPEN_DATA_DOGS,
} from "~/config/links";
import { useGameContext } from "~/context/GameContext";
import { KofiButton } from "../KofiButton";
import { coffeeLinkAnimation } from "./Footer.motion";

const Footer = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "Footer" });

  const { playState } = useGameContext();

  return (
    <footer className="absolute bottom-0 left-0 flex flex-col items-center w-full px-6 md:px-1 py-2 ">
      <AnimatePresence mode="popLayout">
        {playState === "END" ? (
          <motion.div
            key="coffee"
            className="flex flex-col items-center mb-6"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={coffeeLinkAnimation}
          >
            <p className="mb-3 text-xs font-bold text-gray-200 dark:text-gray-300">
              {t("coffeeTitle")}
            </p>
            <KofiButton />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="max-w-2xl text-center text-xs text-white opacity-30 sm:opacity-60 dark:opacity-30 dark:hover:opacity-60 transition-opacity">
        <Trans
          i18nKey="Footer.body"
          components={[
            <Link
              to={LINK_EXT_BH_PERSONAL_SITE}
              target="_blank"
              className="underline"
            />,
            <Link
              to={LINK_EXT_NYC_OPEN_DATA_DOGS}
              target="_blank"
              className="underline"
            />,
            <Link
              to={LINK_EXT_DOG_API}
              target="_blank"
              className="underline"
            />,
          ]}
        />
      </div>
    </footer>
  );
};

export { Footer };
