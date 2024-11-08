"use client";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [data, setData] = useState<{
    [key: string]: {
      min: number;
      max: number;
      number: number;
      attempts: number;
    };
  }>({});
  const [loading, setLoading] = useState(true);
  const [gameDifficulty, setGameDifficulty] = useState("easy");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [guessList, setGuessList] = useState<number[]>([]); // Store guesses as numbers

  const checkAnswer = (guess: number, correctAnswer: number) => {
    if (guess === correctAnswer) {
      setResult("Correct!");
    } else if (guess > correctAnswer) {
      setResult("Lower!");
    } else if (guess < correctAnswer) {
      setResult("Higher!");
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-screen min-w-screen place-content-center">
        <p>
          <CgSpinner size={50} className="animate-spin " />
        </p>
      </div>
    );
  }

  const currentDifficulty = data[gameDifficulty];

  return (
    <div className="flex flex-col items-center justify-items-center p-4 gap-16 sm:p-20">
      {data && (
        <>
          <div className="flex flex-wrap items-center gap-4 capitalize">
            {Object.entries(data).map(([key]) => (
              <Button
                variant={"outline"}
                className={`flex capitalize items-center gap-2 ${
                  gameDifficulty === key && "bg-primary text-secondary "
                }`}
                onClick={() => setGameDifficulty(key)}
                key={key}
              >
                {key}
              </Button>
            ))}
          </div>
          {result && <h1>{result}</h1>}
          <p>
            Guess a number between {currentDifficulty.min} -{" "}
            {currentDifficulty.max}
          </p>

          {/* Display the guess list */}
          <div className="flex flex-col gap-2">
            {guessList.length > 0 && (
              <div>
                <p>Guesses:</p>
                {guessList.map((g, idx) => (
                  <span key={idx}>{g}, </span>
                ))}
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const guessNum = Number(guess);
              checkAnswer(guessNum, currentDifficulty.number);

              // Add the new guess to the guessList array
              setGuessList((prevGuessList) => [...prevGuessList, guessNum]);
              setGuess(""); // Reset the guess input after submission
            }}
          >
            <Input
              onChange={(e) => setGuess(e.target.value)}
              type="number"
              placeholder="Enter guess here"
              value={guess}
            />
            <Button type="submit">Submit</Button>
          </form>
        </>
      )}
    </div>
  );
}
