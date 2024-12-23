import { Check } from "lucide-react";
import { SkullIcon } from "lucide-react";

interface LivesCounterProps {
  modeWin: boolean;
  currentAttempts: number;
}

const LivesCounter = ({ modeWin, currentAttempts }: LivesCounterProps) => {
  return (
    <div className="flex items-center justify-between gap-6 w-full mb-4 text-lg ">
      {modeWin ? (
        <p className="flex text-green-500 items-center gap-2">
          <Check size={15} />
          You guessed this number correctly!
        </p>
      ) : (
        <p className="flex items-center gap-2">
          <SkullIcon size={15} />
          {currentAttempts} lives left
        </p>
      )}
    </div>
  );
};

export default LivesCounter;
