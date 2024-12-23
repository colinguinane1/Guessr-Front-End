import { ArrowLeftFromLine } from "lucide-react";

interface ScreenKeyboardProps {
  setGuess: React.Dispatch<React.SetStateAction<string>>;
  guess: string;
  screenKeyboard: boolean;
}

const ScreenKeyboard = ({
  setGuess,
  guess,
  screenKeyboard,
}: ScreenKeyboardProps) => {
  const keyboardInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  if (screenKeyboard) {
    return (
      <div className="grid grid-cols-3  gap-3">
        {keyboardInputs.map((input) => (
          <div
            className="border flex items-center justify-center rounded-md hover:scale-[1.02] active:scale-[0.98] hover:bg-secondary/50 h-10 w-10 cursor-pointer"
            onClick={() => setGuess(guess + input)}
            key={input}
          >
            {input}
          </div>
        ))}
        <div
          className="border flex items-center justify-center rounded-md hover:scale-[1.02] active:scale-[0.98] hover:bg-secondary/50 h-10 w-10 cursor-pointer"
          onClick={() => setGuess(guess.slice(0, -1))}
        >
          <ArrowLeftFromLine />
        </div>
      </div>
    );
  }
};
export default ScreenKeyboard;
