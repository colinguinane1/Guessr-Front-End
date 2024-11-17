import { Difficulty } from "@/types/difficulty";
import { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Game() {
  const [data, setData] = useState<Difficulty>({});
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState("easy");
  const [result, setResult] = useState("");
  const [guess, setGuess] = useState("");

  useEffect(() => {
    setResult("");
    setGuess("");
  }, [currentMode]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/current`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (guess: string) => async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDifficulty = Object.values(data).find(
      (difficulty) => difficulty.difficulty === currentMode
    );
    if (!selectedDifficulty) {
      return;
    }
    const { value } = selectedDifficulty;
    if (value === parseInt(guess)) {
      setResult("Correct guess");
    } else if (value > parseInt(guess)) {
      setResult("Try a higher number");
    } else {
      setResult("Try a lower number");
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
    <div className="space-y-20">
      <div className="flex flex-wrap gap-2">
        {Object.values(data).map((difficulty) => (
          <Button
            onClick={() => setCurrentMode(difficulty.difficulty)}
            className={`capitalize hover:bg-secondary-foreground ${
              currentMode === difficulty.difficulty &&
              "bg-secondary text-primary "
            }`}
            key={difficulty._id}
          >
            {difficulty.difficulty}
          </Button>
        ))}
      </div>
      <p>{currentMode}</p>
      <p>{result}</p>
      <form onSubmit={handleSubmit(guess)} className="flex gap-2">
        <Input
          placeholder="Enter your guess"
          id="guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
