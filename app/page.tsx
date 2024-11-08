"use client";
import { useEffect, useState } from "react";
import { TabGroup, TabList } from "@headlessui/react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [data, setData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [gameDifficulty, setGameDifficulty] = useState("easy");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("Blank");

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

  return (
    <div className="flex flex-col items-center justify-items-center p-4 gap-16 sm:p-20">
      {data && (
        <>
          <TabGroup>
            <TabList className="flex flex-wrap items-center gap-4 capitalize">
              {Object.entries(data).map(([key, value]) => (
                <Button
                  variant={"outline"}
                  className={`flex items-center gap-2 ${
                    gameDifficulty === key && "bg-primary text-black"
                  }`}
                  onClick={() => setGameDifficulty(key)}
                  key={key}
                >
                  {key}
                  <p>({value})</p>
                </Button>
              ))}
            </TabList>
          </TabGroup>

          <h1>{guess}</h1>
          <p>{result}</p>
          <p>{data[gameDifficulty]}</p>

          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              checkAnswer(Number(guess), data[gameDifficulty]);
            }}
          >
            <Input
              onChange={(e) => setGuess(e.target.value)}
              type="number"
              placeholder="Enter guess here"
            />
            <Button type="submit">Submit</Button>
          </form>
        </>
      )}
    </div>
  );
}
