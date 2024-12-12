import FlickeringGrid from "./ui/flickering-grid";

export default function BackgroundGrid() {
  return (
    <FlickeringGrid
      className="z-0 absolute [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      squareSize={1}
      gridGap={16}
      color="#ffffff"
      maxOpacity={0.2}
      flickerChance={0.1}
    />
  );
}
