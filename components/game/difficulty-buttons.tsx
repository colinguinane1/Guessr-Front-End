import { Difficulty } from "@/types/difficulty";
import { Button } from "../ui/button";

interface DifficultyButtonProps {
  currentMode: string;
  changeDifficulty: (difficulty: string) => void;
  data: Difficulty[];
}

const DifficultyButtons = ({
  data,
  changeDifficulty,
  currentMode,
}: DifficultyButtonProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {Object.values(data).map((difficulty) => (
        <>
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => changeDifficulty(difficulty.difficulty)}
            className={`capitalize  relative transition-all duration-300 ease-in-out transform hover:scale-105 ${
              currentMode === difficulty.difficulty &&
              "bg-secondary text-primary hover:bg-primary-foreground"
            }`}
            style={{
              color: difficulty.color,
            }}
            key={difficulty._id}
          >
            {difficulty.difficulty}
          </Button>
        </>
      ))}
    </div>
  );
};

export default DifficultyButtons;
