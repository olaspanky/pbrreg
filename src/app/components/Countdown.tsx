"use client"; // For Next.js App Router

import { useState, useEffect } from "react";

export default function Countdown() {
  // State to hold the time remaining
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
    <div className="w-full flex justify-center items-center bg-white my-12 lg:my-20">
      <div className="bg-white flex flex-col justify-center items-center gap-5 lg:p-20 lg:max-w-[1000px]">
        <div className="flex items-center">
          <h1 className="text-center text-[#008FD0] text-xl lg:text-4xl font-extrabold">
            UPCOMING EVENT
          </h1>
        </div>
        <div className="flex justify-center py-4 w-full lg:px-4 sm:px-44">
          <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] lg:text-xl w-1/4 font-bold p-2 lg:px-6 lg:py-3 rounded-2xl transition-transform hover:scale-105">
            <div className="lg:text-xl">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-[#008FD0] lg:mt-5 text-sm">Days</div>
          </div>
          <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] lg:text-xl w-1/4 font-bold p-2 lg:px-6 lg:py-3 rounded-2xl transition-transform hover:scale-105">
          <div className="lg:text-xl">
          {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-[#008FD0] lg:mt-5  text-sm">Hours</div>
          </div>
          <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] lg:text-xl w-1/4 font-bold p-2 lg:px-6 lg:py-3 rounded-2xl transition-transform hover:scale-105">
          <div className="lg:text-xl">
          {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-[#008FD0] lg:mt-5  text-sm">Minutes</div>
          </div>
          <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] lg:text-xl w-1/4 font-bold p-2 lg:px-6 lg:py-3 rounded-2xl transition-transform hover:scale-105">
          <div className="lg:text-xl">
          {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-[#008FD0] lg:mt-5  text-sm">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}