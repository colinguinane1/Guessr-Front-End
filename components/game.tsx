import { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./ui/button";
// import { Input } from "./ui/input";
import { BsArrowRepeat } from "react-icons/bs";
import { Difficulty } from "@/types/difficulty";
import {
  ArrowLeftFromLine,
  Check,
  KeyboardIcon,
  SkullIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import api from "@/utils/axios";
import { useUser } from "@/context/UserContext";
import { Toaster, toast } from "sonner";
import About from "./about";
import { AxiosError } from "axios";

export default function Game() {
  const [data, setData] = useState<Difficulty[]>([]); // Initialize as an empty object

  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState<string>("easy");
  const [modeWin, setModeWin] = useState(false);
  const [result, setResult] = useState("Submit");
  const [error, setError] = useState("");
  const [guess, setGuess] = useState("");
  const [screenKeyboard, setScreenKeyboard] = useState(false);

  const [currentAttempts, setCurrentAttempts] = useState<number>(4);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { user, refetchUserData } = useUser();

  const selectedDifficulty =
    data.find(
      (difficulty: Difficulty) => difficulty.difficulty === currentMode
    ) || data[0];

  const currentNumberId = selectedDifficulty?._id;



  const clearLocalStorage = () => {
    const difficulties = [
      "easy",
      "medium",
      "hard",
      "very hard",
      "impossible",
    ];
    difficulties.forEach((difficulty) => {
      localStorage.removeItem(difficulty);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current numbers data
        const response = await api.get(`/api/numbers/current`);
        if (!response.data) {
          setError("Failed to fetch current numbers");
        }

        const data = response.data;
        // console.log("Fetched data:", data);
        const sortedData = data.sort(
          (a: Difficulty, b: Difficulty) => a.max - b.max
        );
        if (sortedData.length > 0) {
          setData(sortedData);
        } else {
          setError("No data available");
        }
        const numberCreated = data[0].created;
        const storedDate = localStorage.getItem("NumberDate");
        if (!storedDate) {
          console.log("No stored number date.");
        }
        if (storedDate !== numberCreated) {
        clearLocalStorage();
          localStorage.setItem("NumberDate", numberCreated);
        }
        if( user) {
          const res = await api.get("/api/numbers/user-data")
          if (res.data) {
            console.log("User number data:", res.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  useEffect(() => {
    const win = checkWin();
    setModeWin(win);
    setResult("Submit");
    setGuess("");

    const attempts = getAttempts();
    console.log(attempts + "here");

    setCurrentAttempts(selectedDifficulty?.attempts - attempts);
  }, [currentMode, selectedDifficulty]);

  useEffect(() => {
    console.log("Current Mode:", currentMode);
    console.log("Data:", data);

    const selectedDifficulty = data.find(
      (difficulty) => difficulty.difficulty === currentMode
    );

    if (!selectedDifficulty) {
      console.error("No data found for current mode:", currentMode); // If no match
      return;
    }

    const expiresDate = new Date(selectedDifficulty.expires);
    console.log("Expires Date:", expiresDate);

    if (isNaN(expiresDate.getTime())) {
      console.error("Invalid expires date:", selectedDifficulty.expires);
      return;
    }

    const target = expiresDate.getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(distance);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [data, currentMode]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeRemaining);

  const isValidGuess = (guess: string) => {
    return /^[+-]?\d+$/.test(guess);
  };
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
      setError("Invalid guess.");
      return;
    }
    if (!guess) {
      setError("Enter a number.");
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
      addAttempt();
    } else {
      setResult("Lower...");
      addAttempt();
    }
    setGuess("");
  };

  const addWin = async () => {
    const attempts = getAttempts();
    const storedWins = localStorage.getItem(currentMode);
    const parseWins = storedWins
      ? JSON.parse(storedWins)
      : { attempts: attempts, completed: true };
    parseWins.completed = true;
    setModeWin(true);
    const totalExperience = () => {
      const removedXp = attempts * (selectedDifficulty.maxExperience * 0.15);

      return Math.ceil(selectedDifficulty.maxExperience - removedXp);
    };
    const xp = totalExperience();
    localStorage.setItem(currentMode, JSON.stringify(parseWins));
    if (user) {
      try {
        const res = await api.post("/api/numbers/correct-guess", {
          numberId: currentNumberId,
          user: user,
          xp: xp > 0 ? xp : 0,
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

  const checkWin = () => {
    if ( user) {
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

  const addAttempt = async () => {
    const storedAttempts = localStorage.getItem(currentMode);
    const parseAttempts = storedAttempts
      ? JSON.parse(storedAttempts)
      : { attempts: 0, completed: false };
    parseAttempts.attempts++;
    localStorage.setItem(currentMode, JSON.stringify(parseAttempts));
    setCurrentAttempts((prevAttempts) => prevAttempts - 1);
    const res = await api.post("/api/numbers/add-guess", {
      numberId: currentNumberId,
      userId: user?._id,
      mode: currentMode,
    });
    console.log(res);
  };

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

  const changeDifficulty = (difficulty: string) => {
    setCurrentMode(difficulty);
    if (!selectedDifficulty) {
      return;
    }
  };

  const keyboardInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  if (loading) {
    return (
      <div className="grid min-h-screen min-w-screen place-content-center">
        <p>
          <CgSpinner size={50} className="animate-spin" />
        </p>
      </div>
    );
  }

  return (
    <>
      <About />
      <div className=" flex-col justify-center items-center p-4">
        <h1 className="text-3xl font-extrabold flex items-center gap-2  mb-8">
          Play -{" "}
          <p className="capitalize" style={{ color: selectedDifficulty.color }}>
            {selectedDifficulty.difficulty}
          </p>
        </h1>

        {/* Difficulty Buttons */}
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

        {/* Lives Counter */}
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

        {/* Countdown Timer */}
        <p className="flex items-center gap-2 text-primary/70 mb-8 text-sm">
          <BsArrowRepeat />
          {hours}:{minutes}:{seconds} until numbers regenerate...
        </p>

        {/* Error Message */}
        <p className="text-destructive mb-6">{error}</p>

        {/* Out of Lives or Guess Form */}
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
            >
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
              {screenKeyboard && (
                <div className="grid grid-cols-4 w-full gap-3">
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
              )}
              <Button
                className={`w-full font-extrabold hover:bg-none tracking-tighter ${
                  result === "Higher..." && "bg-yellow-500"
                } ${result === "Lower..." && "bg-yellow-500"} ${
                  result === "Correct!" || (modeWin && "bg-green-500")
                }`}
                disabled={modeWin}
                variant={currentAttempts <= 0 ? "destructive" : "default"}
                type="submit"
              >
                {result}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
