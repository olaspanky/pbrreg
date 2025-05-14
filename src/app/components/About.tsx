"use client"; // For Next.js with App Router

import { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";

import p2 from "../../../public/assets/p22.png";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + 50);

    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ref for the component to detect when it enters the viewport
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // 'once: true' means it only triggers once
  const controls = useAnimation();

  // Trigger animation when component comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgba(118, 193, 76, 0.5)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const detailVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref} // Attach ref to detect when this enters viewport
      className="w-full flex justify-center items-center bg-[white] my-20"
      variants={containerVariants}
      initial="hidden"
      animate={controls} // Use controls instead of direct "visible"
    >
      <div className="bg-white flex flex-col justify-center items-center gap-5 2xl:px-20">
        <motion.div className="flex items-center" variants={textVariants}>
          <h2 className="text-center text-[#008FD0] text-xl lg:text-4xl font-extrabold">
            About EVENT
          </h2>
        </motion.div>
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center py-4 w-full p-3 lg:px-44 gap-12">
          <div className="lg:w-1/2">
            <div className="flex flex-col lg:gap-7 gap-3">
              <motion.h2
                className="lg:text-2xl text-sm text-[#008FD0] font-extrabold"
                variants={textVariants}
              >
                SECURE YOUR PLACE AT THE TABLE
              </motion.h2>
              <motion.p
                className="text-xs font-light lg:text-lg lg:w-[60%] text-[#1F1F1F]"
                variants={textVariants}
              >
                Connect directly with Nigeria’s pharmaceutical leaders and
                decision-makers at this landmark inaugural summit, where
                industry pioneers and strategic Investors forge the future of
                Africa’s most promising healthcare market
              </motion.p>
              {/* Event Details */}
              <motion.div
                className="space-y-3 mb-6 text-xs lg:text-lg"
                variants={containerVariants}
              >
                <motion.div
                  className="flex items-center"
                  variants={detailVariants}
                >
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <span>Thursday, 22 May 2025</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  variants={detailVariants}
                >
                  <FaClock className="text-gray-400 mr-2" />
                  <span>10:00 AM - 01:00 PM</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  variants={detailVariants}
                >
                  <FaMapMarkerAlt className="text-gray-400 mr-2" />
                  <span>Marriot Hotels, Ikeja</span>
                </motion.div>
              </motion.div>

              {/* Limited Seats Warning */}
              <motion.p
                className="text-[#013983] mb-6 text-xs lg:text-lg font-bold"
                variants={textVariants}
              >
                LIMITED seats available.<br />
                <span className="text-[#013983] font-bold">
                  Register now to secure your spot!
                </span>
              </motion.p>

              {/* Read More Button */}
              <motion.button
                className="bg-[#76C14C] text-xs lg:text-lg text-white font-semibold lg:py-3 lg:px-6 p-2 rounded-lg w-36"
                variants={buttonVariants}
                whileHover="hover"
              >
                Read More
              </motion.button>
            </div>
          </div>
          <motion.div
            className="lg:w-1/2"
            variants={imageVariants}
          >
            <Image src={p2} alt="Event image" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}