import { Difficulty } from "@/types/difficulty";
import { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Game() {
  const [data, setData] = useState<Difficulty>({});
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState("easy");
  const [guess, setGuess] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/all`)
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
            className={`capitalize ${
              currentMode === difficulty.difficulty &&
              "bg-secondary text-primary"
            }`}
            key={difficulty._id}
          >
            {difficulty.difficulty}
          </Button>
        ))}
      </div>

      <form>
        <Input
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </form>
    </div>
  );
}
