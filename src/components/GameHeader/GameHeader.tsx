import { Score } from "~/components/Score";
import { Timer } from "~/components/Timer";
import { HeaderLogo } from "../HeaderLogo";

const GameHeader = () => (
  <div className="w-full grid grid-cols-4 grid-rows-1 gap-4">
    <div className="flex flex-row items-center justify-center p-2">
      <Timer />
    </div>
    <div className="col-span-2 flex items-center justify-center p-4">
      <HeaderLogo />
    </div>
    <div className="col-start-4 flex flex-row items-center justify-center p-2">
      <Score />
    </div>
  </div>
);

export { GameHeader };
