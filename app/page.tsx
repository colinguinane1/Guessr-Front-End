"use client";
import Game from "@/components/game";

export default function Home() {
  // const [data, setData] = useState<{
  //   [key: string]: {
  //     min: number;
  //     max: number;
  //     number: number;
  //     attempts: number;
  //   };
  // }>({});
  // const [loading, setLoading] = useState(true);
  // const [gameDifficulty, setGameDifficulty] = useState("easy");
  // const [guess, setGuess] = useState("");
  // const [result, setResult] = useState("");
  // const [guessList, setGuessList] = useState<number[]>([]); // Store guesses as numbers
  // const [currentGuessedModes, setCurrentGuessedModes] = useState<string[]>([]);

  // const correctGuess = (currentDifficulty: string) => {
  //   if (!currentGuessedModes.includes(currentDifficulty)) {
  //     const updatedGuessedModes = [...currentGuessedModes, currentDifficulty];
  //     setCurrentGuessedModes(updatedGuessedModes); //
  //     localStorage.setItem("modeGuessed", JSON.stringify(updatedGuessedModes));
  //   }

  //   setResult("Correct!");
  // };

  // const checkAnswer = (guess: number, correctAnswer: number) => {
  //   if (guess === correctAnswer) {
  //     correctGuess(gameDifficulty);
  //   } else if (guess > correctAnswer) {
  //     setResult("Lower!");
  //   } else if (guess < correctAnswer) {
  //     setResult("Higher!");
  //   }
  // };

  // useEffect(() => {
  //   const storedModes = localStorage.getItem("modeGuessed");
  //   if (storedModes) {
  //     // Parse and set the state with the modes from localStorage
  //     setCurrentGuessedModes(JSON.parse(storedModes));
  //   }
  //   fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/numbers/all`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched data:", data);
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="grid min-h-screen min-w-screen place-content-center">
  //       <p>
  //         <CgSpinner size={50} className="animate-spin " />
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="grid place-content-center h-[80vh] w-screen">
      <Game />
    </div>
  );
}
