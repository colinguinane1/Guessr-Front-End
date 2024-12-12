"use client";
import FlickeringGrid from "./ui/flickering-grid";
import { useTheme } from "next-themes";

export default function BackgroundGrid() {
  const { theme } = useTheme();
  return (
    <FlickeringGrid
      className="z-[-1] inset-0 cursor absolute [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      squareSize={1}
      gridGap={16}
      color={theme === "dark" ? "white" : "black"}
      maxOpacity={0.4}
      flickerChance={0.2}
    />
  );
}
