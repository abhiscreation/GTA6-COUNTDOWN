import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import viLogo from "./Assets/vi.png";

const App = () => {
  // Release date is fixed — no need to recalculate
  const releaseDate = new Date("November 19, 2026 00:00:00").getTime();

  // Memoize calculateTime so its reference never changes
  const calculateTime = useCallback(() => {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    // Countdown finished
    if (distance <= 0) {
      return null;
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }, [releaseDate]); // releaseDate is stable, but ESLint loves seeing it here

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTime]); // Now calculateTime is properly listed → ESLint warning gone!

  // Countdown finished
  if (!timeLeft) {
    return (
      <div className="container">
        <h1 className="title">GTA VI IS HERE!</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="background-video"></div>
      <div className="neon-layer"></div>

      {/* GTA VI Logo */}
      <div className="logo-space">
        <img src={viLogo} alt="GTA VI Logo" className="gta-logo" />
      </div>

      {/* Release Date Text */}
      <h1 className="release-date color-shift">
        COMING<br />NOVEMBER 19<br />2026
      </h1>

      {/* Countdown Boxes */}
      <div className="countdown">
        <div className="time-box">
          <span>{timeLeft.days}</span>
          <p>Days</p>
        </div>
        <div className="time-box">
          <span>{timeLeft.hours}</span>
          <p>Hours</p>
        </div>
        <div className="time-box">
          <span>{timeLeft.minutes}</span>
          <p>Minutes</p>
        </div>
        <div className="time-box">
          <span>{timeLeft.seconds}</span>
          <p>Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default App;