"use client";
import Game from "@/components/game";

export default function Home() {
  return (
    <div>
      <p className="absolute top-2 left-2 font-extrabold text-lg">Guessr</p>
      <div className="grid place-content-center md:h-[80vh]  p-4 w-screen">
        <Game />
      </div>
    </div>
  );
}
