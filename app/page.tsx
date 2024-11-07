"use client";
import { useEffect, useState } from "react";
import { TabGroup, TabList } from "@headlessui/react";

import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [gameDifficulty, setGameDifficulty] = useState("easy");
  const [guess, setGuess] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          <p>Fetched from {process.env.NEXT_PUBLIC_BACK_END_URL}</p>
          <TabGroup>
            <TabList className="flex items-center gap-4 capitalize">
              {Object.entries(data).map(([key, value]) => (
                <Button
                  className={`flex items-center gap-2 ${
                    gameDifficulty === key && "bg-primary-foreground text-black"
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handle form submission if needed
            }}
          >
            <Input
              onChange={(e) => setGuess(e.target.value)}
              type="number"
              placeholder="Enter guess here"
            ></Input>
          </form>
        </>
      )}
    </div>
  );
}
