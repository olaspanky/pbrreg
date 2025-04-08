"use client"; // If using Next.js with App Router, include this at the top

import { useState, useEffect } from "react";

export default function Countdown() {
  // State to hold the time remaining
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate the target date (50 days from now)
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + 50); // Add 50 days

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

  // Update the countdown every second
  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // Set initial time

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-center items-center bg-[white]">
    <div className="bg-white flex flex-col justify-center items-center gap-5 p-20 max-w-[1000px]">
        <div className="flex items-center">
            <h1 className="text-center text-[#008FD0] text-4xl  font-extrabold">UPCOMING EVENT</h1>
        </div>
    <div className="flex justify-center py-4 w-full px-44 ">
      <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] text-xl w-1/4 font-bold px-6 py-3 rounded-2xl">
        <div className=" text-xl ">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-[#008FD0] mt-5 text-sm">Days</div>
      </div>
      <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] text-xl w-1/4 font-bold px-6 py-3 rounded-2xl">
        <div className=" text-xl ">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-[#008FD0] mt-5 text-sm">Hours</div>
      </div>
      <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] text-xl w-1/4 font-bold px-6 py-3 rounded-2xl">
        <div className=" text-xl ">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-[#008FD0] mt-5 text-sm">Minutes</div>
      </div>
      <div className="flex flex-col items-center mx-2 border border-[#008FD0] text-[#008FD0] text-xl w-1/4 font-bold px-6 py-3 rounded-2xl">
        <div className=" text-xl ">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-[#008FD0] mt-5 text-sm">Seconds</div>
      </div>
      </div>
      </div>
    </div>
  );
}