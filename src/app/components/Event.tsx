"use client"; // If using Next.js with App Router, include this at the top

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

// Partner logos (you'll need to replace these with actual image paths or URLs)
const partners = [
  { name: "IFC", logo: "/pt1.svg" },
  { name: "World Bank Group", logo: "/pt2.svg" },
  { name: "Access to Medicine Foundation", logo: "/pt3.svg" },
  { name: "PWC Nigeria", logo: "/pt4.svg" },
];

export default function EventParticipants() {
  // Slider settings for the Partners section
  const sliderSettings = {
    dots: true, // Show dots below the slider
    infinite: true, // Loop the slider
    speed: 500, // Transition speed
    slidesToShow: 3, // Show 3 logos at a time (adjust based on screen size)
    slidesToScroll: 1, // Scroll 1 logo at a time
    autoplay: true, // Auto-scroll
    autoplaySpeed: 3000, // 3 seconds per slide
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // For mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" my-12 flex flex-col gap-7 p-3">
      {/* Register Now Link */}
      <div className="lg:text-center pr-8 ">
        <a href="/register" className="text-[#008FD0] lg:text-4xl text-xl font-extrabold">
          REGISTER NOW
        </a>
      </div>

      {/* Attendees and Investors Section */}
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 px-4 mb-12">
        {/* Attendees */}
        <div className="bg-white  p-6 rounded-lg shadow-md text-center lg:w-[80%]">
          <h2 className="lg:text-2xl  text-lg font-bold text-[#1A3C5E] mb-4">ATTENDEES</h2>
          <p className="text-gray-600 mb-4 lg:text-xl  text-sm">
            Forge meaningful connections with leading pharma stakeholders, unlocking unique collaboration and partnership opportunities.
          </p>
          <p className="text-gray-600 mb-6 lg:text-xl  text-sm">
            Leverage focused discussions and exchanges to uncover new growth pathways and elevate your impact in Nigeria’s healthcare ecosystem.
          </p>
          <Link href="/pages/register" className="flex  justify-center items-center">
         <button className="bg-[#76C14C] text-white  px-6 py-3 rounded-md hover:bg-[#76C14C] ">
            Register now
          </button>
         </Link>
        </div>

        {/* Investors */}
        <div className="bg-white   p-6 rounded-lg shadow-md text-center lg:w-[80%]">
          <h2 className="lg:text-2xl  text-lg font-bold text-[#1A3C5E] mb-4">INVESTORS</h2>
          <p className="text-gray-600 mb-4 lg:text-xl  text-sm">
            Identify high-potential ventures shaping Nigeria’s pharma sector, opening doors to impactful and scalable investments.
          </p>
          <p className="text-gray-600 mb-6 lg:text-xl  text-sm">
            Gain direct access to influential players and thought leaders, streamlining deal flow and accelerating market entry.
          </p>
          <Link href="/pages/register" className="flex  justify-center items-center">
         <button className="bg-[#76C14C] text-white px-6 py-3 rounded-md hover:bg-[#76C14C] ">
            Register now
          </button>
         </Link>
        </div>
      </div>

      {/* Partners Section (Slider) */}
      <div className="container mx-auto px-4 flex flex-col lg:gap-5 my-20">
        <h2 className="text-[#008FD0] text-xl lg:text-4xl font-extrabold text-center ">PARTNERS</h2>
        <Slider {...sliderSettings}>
          {partners.map((partner, index) => (
            <div key={index} className="">
              <div className="  flex justify-center items-center ">
                {/* Replace with actual image */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className=" max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}