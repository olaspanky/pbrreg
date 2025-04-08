"use client"; // If using Next.js with App Router, include this at the top

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time left until May 22, 2025, 10:00 AM WAT
  const calculateTimeLeft = () => {
    const now = new Date();
    // Set target date to May 22, 2025, 10:00 AM WAT
    const targetDate = new Date("2025-05-22T10:00:00+01:00"); // +01:00 for WAT

    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Countdown finished
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Update countdown every second
  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // Set initial time

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center py-4 ">
      <div className="flex flex-col items-center mx-2">
        <div className="bg-[#00C853] text-white lg:text-2xl text-md font-bold px-6 py-3 rounded-lg">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-white mt-2">Days</div>
      </div>
      <div className="flex flex-col items-center mx-2">
        <div className="bg-[#00C853] text-white lg:text-2xl text-md font-bold px-6 py-3 rounded-lg">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-white mt-2">Hours</div>
      </div>
      <div className="flex flex-col items-center mx-2">
        <div className="bg-[#00C853] text-white lg:text-2xl text-md font-bold px-6 py-3 rounded-lg">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-white mt-2">Minutes</div>
      </div>
      <div className="flex flex-col items-center mx-2">
        <div className="bg-[#00C853] text-white lg:text-2xl text-md font-bold px-6 py-3 rounded-lg">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-white mt-2">Seconds</div>
      </div>
    </div>
  );
}