import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { coffeeLinkAnimation } from "./Footer.motion";
import { useGameContext } from "~/context/GameContext";

const Footer = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "Footer" });

  const { playState } = useGameContext();

  return (
    <footer className="absolute bottom-0 left-0 flex flex-col items-center w-full px-6 md:px-1 py-2 ">
      {playState === "END" ? (
        <motion.div
          className="flex flex-col items-center mb-6"
          initial="initial"
          animate="animate"
          variants={coffeeLinkAnimation}
        >
          <p className="mb-3 text-xs font-bold text-gray-300">
            {t("coffeeTitle")}
          </p>
          <a href="https://ko-fi.com/Y8Y4N0UR9" target="_blank">
            <img
              className="border-0 h-7"
              src="https://storage.ko-fi.com/cdn/kofi1.png?v=6"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
        </motion.div>
      ) : null}
      <div className="max-w-2xl text-center text-xs text-white opacity-30 sm:opacity-60 dark:opacity-30 dark:hover:opacity-60 transition-opacity">
        <Trans
          i18nKey="Footer.body"
          components={[
            <Link
              to="https://benhodgson.net"
              target="_blank"
              className="underline"
            />,
            <Link
              to="https://data.cityofnewyork.us/Health/NYC-Dog-Licensing-Dataset/nu7n-tubp/about_data"
              target="_blank"
              className="underline"
            />,
            <Link
              to="https://dog.ceo/dog-api/"
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
