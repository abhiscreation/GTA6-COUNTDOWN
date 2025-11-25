import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import viLogo from "./Assets/vi.png";

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="rockstar-loader">
      <div className="loader-text">
        Take me back to<br />Vice City...
      </div>
      <div className="loader-subtext">Loading the dream</div>
    </div>
  );
};

const App = () => {
  // ALL HOOKS MUST BE AT THE TOP — NO CONDITIONALS BEFORE THEM!
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  const releaseDate = new Date("November 19, 2026 00:00:00").getTime();

  const calculateTime = useCallback(() => {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    if (distance <= 0) {
      return null;
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }, [releaseDate]);

  // Initial calculation
  useEffect(() => {
    setTimeLeft(calculateTime());
  }, [calculateTime]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  // Hide loading screen after 3.8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  // SHOW LOADING SCREEN FIRST
  if (isLoading) {
    return <LoadingScreen />;
  }

  // COUNTDOWN FINISHED
  if (!timeLeft) {
    return (
      <div className="container">
        <h1 className="title">GTA VI IS HERE!</h1>
      </div>
    );
  }

  // MAIN COUNTDOWN PAGE
  return (
    <div className="container">
      <div className="neon-layer"></div>

      <div className="logo-space">
        <img src={viLogo} alt="GTA VI Logo" className="gta-logo" />
      </div>

      <h1 className="release-date color-shift">
        COMING<br />NOVEMBER 19<br />2026
      </h1>

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