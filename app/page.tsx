"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data && (
        <>
          <h1 className="text-4xl font-bold text-center">
            Number Game Front-End
          </h1>
          <p>Fetched from {process.env.BACK_END_URL}</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {Object.entries(data).map(([difficulty, value]) => (
              <div
                key={difficulty}
                className="flex flex-col items-center p-8 bg-gray-100 rounded-lg"
              >
                <h2 className="text-2xl font-semibold">{difficulty}</h2>
                <p className="text-xl font-light">{value}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
