import { Score } from "~/components/Score";
import { Timer } from "~/components/Timer";

const GameHeader = () => (
  <header className="flex-1 w-full max-w-2xl">
    <div className="w-full grid grid-cols-4 grid-rows-1 gap-4">
      <div className="flex flex-row items-center justify-center p-2">
        <Timer />
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <img src="./logo.svg" width={160} height={24} alt="Pupularity" />
      </div>
      <div className="col-start-4 flex flex-row items-center justify-center p-2">
        <Score />
      </div>
    </div>
  </header>
);

export { GameHeader };
