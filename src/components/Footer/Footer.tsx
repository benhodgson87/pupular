import { Link } from "@remix-run/react";

const Footer = () => (
  <footer className="absolute bottom-0 left-0 flex flex-col items-center w-full px-6 md:px-1 py-2 ">
    <div className="max-w-2xl text-center text-xs text-white opacity-30 sm:opacity-60 dark:opacity-30 dark:hover:opacity-60 transition-opacity">
      Built by{" "}
      <Link to="https://benhodgson.net" target="_blank" className="underline">
        Ben Hodgson
      </Link>
      , using{" "}
      <Link
        to="https://data.cityofnewyork.us/Health/NYC-Dog-Licensing-Dataset/nu7n-tubp/about_data"
        target="_blank"
        className="underline"
      >
        NYC Open Data
      </Link>{" "}
      and the{" "}
      <Link to="https://dog.ceo/dog-api/" target="_blank" className="underline">
        Dog API
      </Link>
      . Enjoy playing?{" "}
      <Link
        to="https://ko-fi.com/benhodgson"
        target="_blank"
        className="underline"
      >
        Buy me a coffee
      </Link>
      .
    </div>
  </footer>
);

export { Footer };
