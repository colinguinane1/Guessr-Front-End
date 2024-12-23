import { SkullIcon } from "lucide-react";
import { Input } from "../ui/input";
import { KeyboardIcon } from "lucide-react";
import { ArrowLeftFromLine } from "lucide-react";
import { Button } from "../ui/button";
import { Difficulty } from "@/types/difficulty";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import api from "@/utils/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import ScreenKeyboard from "./screen-keyboard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface GuessFormProps {
  data: Difficulty[];
  currentMode: string;
  setModeWin: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentAttempts: React.Dispatch<React.SetStateAction<number>>;
  modeWin: boolean;
  currentAttempts: number;
}

const GuessForm = ({
  data,
  currentMode,
  setModeWin,
  setCurrentAttempts,
  currentAttempts,
  modeWin,
}: GuessFormProps) => {
  const [guess, setGuess] = useState("");
  const [modeGuesses, setModeGuesses] = useState<string[]>([]);
  const [result, setResult] = useState("Submit");
  const [error, setError] = useState("");
  const [screenKeyboard, setScreenKeyboard] = useState(false);
  const { user, refetchUserData } = useUser();

  const isValidGuess = (guess: string) => {
    return /^[+-]?\d+$/.test(guess);
  };

  const selectedDifficulty =
    data.find(
      (difficulty: Difficulty) => difficulty.difficulty === currentMode
    ) || data[0];

  const getAttempts = () => {
    if (user) {
      // Convert plain object to Map
      const currentData = new Map(Object.entries(user.current_number_data));
      const attemptsData = currentData.get(currentMode);
      if (!attemptsData) {
        return 0;
      }
      return attemptsData.attempts;
    } else {
      const attempts = localStorage.getItem(currentMode);
      const parseAttempts = attempts
        ? JSON.parse(attempts)
        : { attempts: 0, completed: false };
      return parseAttempts.attempts || 0;
    }
  };

  const checkWin = () => {
    if (user) {
      const currentData = new Map(Object.entries(user.current_number_data));
      const attemptsData = currentData.get(currentMode);
      if (!attemptsData) {
        return false;
      }
      return attemptsData.win;
    }
    const storedWins = localStorage.getItem(currentMode);
    const parseWins = storedWins ? JSON.parse(storedWins) : null;
    if (parseWins && parseWins.completed !== undefined) {
      return parseWins.completed;
    }
    return false;
  };

  const addWin = async () => {
    const attempts = getAttempts();
    const storedWins = localStorage.getItem(currentMode);
    const parseWins = storedWins
      ? JSON.parse(storedWins)
      : { attempts: attempts, completed: true };
    parseWins.completed = true;
    setModeWin(true);
    localStorage.setItem(currentMode, JSON.stringify(parseWins));
    if (user) {
      try {
        const res = await api.post("/api/numbers/correct-guess", {
          numberId: selectedDifficulty._id,
          user: user,
          mode: currentMode,
        });
        const addedXp = res.data.xp;
        toast.success(`You have gained ${addedXp} XP!`);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }

      refetchUserData();
    }
  };

  const addAttempt = async (guess: string) => {
    const storedAttempts = localStorage.getItem(currentMode);
    const parseAttempts = storedAttempts
      ? JSON.parse(storedAttempts)
      : { attempts: 0, win: false, guesses: [] };
    parseAttempts.attempts++;
    parseAttempts.guesses.push(guess);
    localStorage.setItem(currentMode, JSON.stringify(parseAttempts));
    setModeGuesses((prevModeGuesses) => [...prevModeGuesses, guess]);
    setCurrentAttempts((prevAttempts) => prevAttempts - 1);
    const res = await api.post("/api/numbers/add-guess", {
      numberId: selectedDifficulty._id,
      userId: user?._id,
      mode: currentMode,
      guess: guess,
    });
    console.log(res);
  };


  const getGuesses = () => {
    if (user) {
      console.log("User data:", user.current_number_data);
      const currentData = new Map(Object.entries(user.current_number_data));
      const attemptsData = currentData.get(currentMode);
      console.log("User guesses for mode:", attemptsData?.guesses);
      return Array.isArray(attemptsData?.guesses) ? attemptsData.guesses : [];
    }
    const storedGuesses = localStorage.getItem(currentMode);
  
    const parseGuesses = storedGuesses ? JSON.parse(storedGuesses) : [];  
    console.log("Stored guesses for mode:", parseGuesses.guesses);
    return Array.isArray(parseGuesses.guesses) ? parseGuesses.guesses : [];
  };

  useEffect(() => {
    const win = checkWin();    
    const modeGuesses = getGuesses();
    const attempts = getAttempts();
    setModeWin(win);
    setResult("Submit");
    setGuess("");
    setModeGuesses(modeGuesses);
    setCurrentAttempts(selectedDifficulty?.attempts - attempts);
  }, [currentMode, selectedDifficulty]);

  const handleSubmit = (guess: string) => async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDifficulty) {
      console.error("No data found for current mode:", currentMode);
      return;
    }
    const value = selectedDifficulty.value;
    const storedDate = localStorage.getItem("NumberDate");
    if (!storedDate) {
      localStorage.setItem("NumberDate", data[0].created);
    }
    if (!isValidGuess(guess)) {
      setResult("Invalid guess.");
      return;
    }
    if (!guess) {
      setResult("Enter a number.");
      return;
    }
    setError("");
    if (parseInt(guess) > selectedDifficulty.max) {
      setError("Number out of range");
      setGuess("");
      return;
    } else if (value === parseInt(guess)) {
      setResult("Correct!");
      addWin();
    } else if (value > parseInt(guess)) {
      setResult("Higher...");
      addAttempt(guess);
    } else {
      setResult("Lower...");
      addAttempt(guess);
    }
    setGuess("");
  };

  const lastGuessedNumber = modeGuesses[modeGuesses.length - 1];
  return (
    <div className="flex items-center w-full justify-center">
      {currentAttempts <= 0 ? (
        <p className="font-extrabold text-destructive text-4xl tracking-tighter flex gap-2 items-center">
          <SkullIcon />
          Out of lives...
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(guess)}
          className="flex items-center z-10 w-full justify-center flex-col gap-2"
        > {modeGuesses.length > 0 &&
        <Accordion className="w-full" type="single" collapsible><AccordionItem value="guesses"><AccordionTrigger>Guesses: {lastGuessedNumber}</AccordionTrigger><AccordionContent>{modeGuesses.map((guess, idx) => (<li key={idx}>{guess}</li>))}</AccordionContent></AccordionItem></Accordion>}
  
          <div className="flex items-center gap-2 w-full">
            <Input
              className={`bg-transparent border p-4 w-full outline-none  font-extrabold tracking-tighter`}
              placeholder={`1-${selectedDifficulty?.max}`}
              disabled={currentAttempts <= 0}
              id="guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <div
              onClick={() => setScreenKeyboard(!screenKeyboard)}
              className={`border flex items-center justify-center rounded-md hover:scale-[1.02] active:scale-[0.98] hover:bg-secondary/50 h-[36px] w-[36px] cursor-pointer ${
                screenKeyboard && "bg-secondary"
              }`}
            >
              <KeyboardIcon size={14} />
            </div>
          </div>
          <ScreenKeyboard
            setGuess={setGuess}
            guess={guess}
            screenKeyboard={screenKeyboard}
          />
          <Button
            className={`w-full font-extrabold hover:bg-none tracking-tighter ${
              result === "Higher..." && "bg-yellow-500"
            } ${result === "Lower..." && "bg-yellow-500"} ${
              result === "Correct!" || (modeWin && "bg-green-500")
            } ${error && "bg-destructive"}`}
            disabled={modeWin}
            variant={currentAttempts <= 0 ? "destructive" : "default"}
            type="submit"
          >
            {result}
          </Button>
        </form>
      )}
    </div>
  );
};

export default GuessForm;
