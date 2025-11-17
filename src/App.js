import React, { useEffect, useState } from "react";
import "./App.css";
import viLogo from "./Assets/vi.png";


const App = () => {
  const releaseDate = new Date("November 19, 2026 00:00:00").getTime();

  const calculateTime = () => {
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
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="container">
        <h1 className="title">GTA VI IS HERE! 🚀</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="background-video"></div>
      <div className="neon-layer"></div>

      {/* <h1 className="title">Grand Theft Auto VI</h1>
      <h2 className="subtitle">Official Countdown</h2> */}

      {/* <div className="logo-space">
        <img src="../" alt="GTA VI Logo" className="gta-logo" />
      </div> */}

      <div className="logo-space">
        <img src={viLogo} alt="GTA VI Logo" className="gta-logo" />
      </div>

      <h1 className="release-date color-shift">
        COMING<br />NOVEMBER 19<br />2026
      </h1>


      <div className="countdown">
        <div className="time-box"><span>{timeLeft.days}</span><p>Days</p></div>
        <div className="time-box"><span>{timeLeft.hours}</span><p>Hours</p></div>
        <div className="time-box"><span>{timeLeft.minutes}</span><p>Minutes</p></div>
        <div className="time-box"><span>{timeLeft.seconds}</span><p>Seconds</p></div>
      </div>

    </div>
  );
};

export default App;
