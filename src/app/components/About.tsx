"use client"; // If using Next.js with App Router, include this at the top

import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa"; // For icons
import Image from "next/image"; // For images

import p2 from "../../../public/assets/p2.png"; // Import your image

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
    <div className="w-full flex justify-center items-center bg-[white] ">
    <div className="bg-white flex flex-col justify-center items-center gap-5 2xl:p-20 ">
        <div className="flex items-center">
            <h2 className="text-center text-[#008FD0] text-4xl  font-extrabold">About EVENT</h2>
        </div>
    <div className="flex flex-row   justify-center items-center py-4 w-full px-44 gap-12 ">
        <div className="w-1/2">
        <div className="flex flex-col gap-7 ">
            <h2 className="text-2xl text-[#008FD0] font-extrabold">SECURE YOUR PLACE AT THE TABLE</h2>
            <p>Connect directly with Nigeria’s pharmaceutical leaders and decision-makers at this landmark inaugural summit, where industry pioneers and strategic Investors forge the future of Africa’s most promising healthcare market</p>
           {/* Event Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          <span>Thursday, 22 May 2025</span>
        </div>
        <div className="flex items-center">
          <FaClock className="text-gray-400 mr-2" />
          <span>10:00 AM - 01:00 PM</span>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          <span>Marriot Hotels, Ikeja</span>
        </div>
      </div>

      {/* Limited Seats Warning */}
      <p className="text-[#00DDEB] mb-6">
        LIMITED seats available. Invitations confirmed by April 30<sup>th</sup>, 2025.
      </p>

      {/* Read More Button */}
      <button className="bg-[#76C14C] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#76C14C] transition w-36">
        Read More
      </button>
        </div>
        </div>
        <div className="w-1/2">
        <Image src={p2} alt="image"/>
        </div>
     
      </div>
      </div>
    </div>
  );
}