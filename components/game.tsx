import { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./ui/button";
// import { Input } from "./ui/input";
import { BsArrowRepeat } from "react-icons/bs";
import { Difficulty } from "@/types/difficulty";
import { Check, SkullIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import api from "@/utils/axios";
import { useUser } from "@/context/UserContext";

export default function Game() {
  const [data, setData] = useState<Difficulty[]>([]); // Initialize as an empty object

  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState<string>("easy");
  const [modeWin, setModeWin] = useState(false);
  const [result, setResult] = useState("Submit");
  const [error, setError] = useState("");
  const [guess, setGuess] = useState("");

  const [currentAttempts, setCurrentAttempts] = useState<number>(4);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { user } = useUser();

  const selectedDifficulty =
    data.find((difficulty) => difficulty.difficulty === currentMode) || data[0];

  const currentNumberId = selectedDifficulty?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current numbers data
        const response = await api.get(`/api/numbers/current`);
        if (!response.data) {
          setError("Failed to fetch current numbers");
        }

        const data = response.data;
        console.log("Fetched data:", data);
        // Sort the data based on the 'max' field (easy -> impossible)
        const sortedData = data.sort(
          (a: Difficulty, b: Difficulty) => a.max - b.max
        );
        setData(sortedData);

        const storedDate = localStorage.getItem("NumberDate");
        const createdDate = new Date(data[0].created);
        if (storedDate) {
          const twentyFourHours = 24 * 60 * 60 * 1000;
          const storedDateTime = new Date(storedDate);
          console.log(
            storedDateTime.getTime() + twentyFourHours <= createdDate.getTime()
          );
          if (
            storedDateTime.getTime() + twentyFourHours <=
            createdDate.getTime()
          ) {
            const keysToRemove = ["easy", "medium", "hard", "impossible"];
            console.log("Removing local storage");
            keysToRemove.forEach((key) => {
              localStorage.removeItem(key);
            });
            localStorage.setItem("NumberDate", data[0].expires);
          }
        } else {
          localStorage.setItem("NumberDate", data[0].expires);
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
    if (!selectedDifficulty) {
      return;
    }
    const attempts = getAttempts();
    console.log(attempts + "here");
    if (attempts) {
    }
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
        setTimeRemaining(0); // Stop countdown when time is up
      } else {
        setTimeRemaining(distance);
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
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
    // Regular expression for whole numbers (positive or negative)
    return /^[+-]?\d+$/.test(guess);
  };
  const handleSubmit = (guess: string) => async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDifficulty = data.find(
      (difficulty) => difficulty.difficulty === currentMode
    );

    if (!selectedDifficulty) {
      console.error("No data found for current mode:", currentMode); // If no match
      return;
    }

    const value = selectedDifficulty.value;

    if (!isValidGuess(guess)) {
      setError("Invalid guess.");
      return;
    }
    if (!guess) {
      setError("Enter a number.");
      return;
    }
    setError("");
    if (value === parseInt(guess)) {
      setResult("Correct!");

      addWin();
    } else if (value > parseInt(guess)) {
      setResult("Higher...");
      addAttempt();
    } else {
      setResult("Lower...");
      addAttempt();
    }
  };

  const addWin = () => {
    const attempts = getAttempts();
    const storedWins = localStorage.getItem(currentMode);
    const parseWins = storedWins
      ? JSON.parse(storedWins)
      : { attempts: attempts, completed: true };
    parseWins.completed = true;
    setModeWin(true);
    localStorage.setItem(currentMode, JSON.stringify(parseWins));
    const res = api.post("/api/numbers/correct-guess", {
      numberId: currentNumberId,
      userId: "1234",
    });

    console.log(res);
  };

  const checkWin = () => {
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
    });
    console.log(res);
  };

  const getAttempts = () => {
    const attempts = localStorage.getItem(currentMode);
    const parseAttempts = attempts
      ? JSON.parse(attempts)
      : { attempts: 0, completed: false };
    if (parseAttempts.attempts === null) {
      console.log("Current Attempts" + 0);
      return 0;
    }
    console.log("Current Attempts" + attempts);
    return Number(parseAttempts.attempts);
  };

  const changeDifficulty = (difficulty: string) => {
    setCurrentMode(difficulty);
    if (!selectedDifficulty) {
      return;
    }

    console.log(currentAttempts);
  };

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
    <div className="grid place-content-center h-screen p-4">
      <h1 className="text-3xl font-extrabold flex items-center gap-2  mb-8">
        Play -{" "}
        <p className="capitalize" style={{ color: selectedDifficulty.color }}>
          {selectedDifficulty.difficulty}
        </p>
      </h1>

      {/* Difficulty Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {Object.values(data).map((difficulty) => (
          <>
            <Button
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
            className="flex items-center z-10 justify-center flex-col gap-2"
          >
            <Input
              className={`bg-transparent border p-4 w-full outline-none  font-extrabold tracking-tighter`}
              placeholder={`1-${selectedDifficulty?.max}`}
              disabled={currentAttempts <= 0}
              id="guess"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
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
  );
}
