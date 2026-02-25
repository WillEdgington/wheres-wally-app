import { useEffect, useState } from "react";

export default function Timer({ startTime, duration }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!startTime || duration !== null) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 500);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const elapsedSeconds =
    duration !== null
      ? duration
      : startTime
        ? Math.floor((now - startTime) / 1000)
        : 0;

  const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const seconds = String(elapsedSeconds % 60).padStart(2, "0");

  return (
    <div className="game-timer">
      {minutes}:{seconds}
    </div>
  );
}