import { BsArrowRepeat } from "react-icons/bs";

interface CountdownTimerProps {
  timeRemaining: number;
}

const CountdownTimer = ({ timeRemaining }: CountdownTimerProps) => {
  const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeRemaining);
  return (
    <p className="flex items-center gap-2 text-primary/70 mb-8 text-sm">
      <BsArrowRepeat />
      {hours}:{minutes}:{seconds} until numbers regenerate...
    </p>
  );
};
export default CountdownTimer;
