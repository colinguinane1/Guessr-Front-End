"use client";
import Game from "@/components/game";

export default function Home() {
  return (
    <div>
      <div className="grid place-content-center h-[80vh]  p-4 w-screen">
        <Game />
      </div>
    </div>
  );
}
