import { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { Difficulty } from "@/types/difficulty";
import api from "@/utils/axios";
import About from "./about";
import DifficultyButtons from "./game/difficulty-buttons";
import LivesCounter from "./game/lives-counter";
import CountdownTimer from "./game/countdown-timer";
import GuessForm from "./game/guess-form";

export default function Game() {
  const [data, setData] = useState<Difficulty[]>([]); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState<string>("easy");
  const [modeWin, setModeWin] = useState(false);
  const [currentAttempts, setCurrentAttempts] = useState<number>(4);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const selectedDifficulty =
    data.find(
      (difficulty: Difficulty) => difficulty.difficulty === currentMode
    ) || data[0];
  const clearLocalStorage = () => {
    const difficulties = ["easy", "medium", "hard", "very hard", "impossible"];
    difficulties.forEach((difficulty) => {
      localStorage.removeItem(difficulty);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/numbers/current`);
        if (!response.data) {
          console.error("Failed to fetch current numbers");
          return; // Exit early if no data is found
        }
        const data = response.data;
        // console.log("Fetched Data:", data); // Log the data
        const sortedData = data.sort(
          (a: Difficulty, b: Difficulty) => a.max - b.max
        );
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log("Data:", data);
    if (!selectedDifficulty) {
      return;
    }
    const expiresDate = new Date(selectedDifficulty.expires);
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

  const changeDifficulty = (difficulty: string) => {
    setCurrentMode(difficulty);
    if (!selectedDifficulty) {
      return;
    }
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
    <>
      <About />
      <div className=" flex-col justify-center items-center p-4">
        <h1 className="text-3xl font-extrabold flex items-center gap-2  mb-8">
          Play -{" "}
          <p className="capitalize" style={{ color: selectedDifficulty.color }}>
            {selectedDifficulty.difficulty}
          </p>
        </h1>
        <DifficultyButtons
          data={data}
          changeDifficulty={changeDifficulty}
          currentMode={currentMode}
        />
        <LivesCounter modeWin={modeWin} currentAttempts={currentAttempts} />
        <CountdownTimer timeRemaining={timeRemaining} />
        <GuessForm
          data={data}
          currentMode={currentMode}
          setModeWin={setModeWin}
          setCurrentAttempts={setCurrentAttempts}
          modeWin={modeWin}
          currentAttempts={currentAttempts}
        />
      </div>
    </>
  );
}
