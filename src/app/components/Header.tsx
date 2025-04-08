import Image from 'next/image';
import p1 from "../../../public/assets/p1.png";
import Countdown from './Countdown';
import Link from 'next/link';
// components/Header.tsx
const Header = () => {
    return (
<header
  className="relative flex justify-center items-center bg-cover bg-center"
  style={{
    backgroundImage: `url('/assets/bg.png')`, // Path to your image
  }}
>
  {/* Overlay for blue tint */}
  <div className="absolute inset-0 bg-[#013983] opacity-70"></div>        <div className="relative z-10 text-white p-5 lg:p-10 flex flex-col gap-5 justify-between items-center max-w-[1420px]">
        <div className="container mx-auto lg:text-center  flex flex-col gap-3  lg:gap-7 lg:p-36 py-5">
          <h1 className="lg:text-lg text-xs font-bold ">
            UNLOCK NIGERIA'S PHARMACEUTICAL FRONTIER
          </h1>
          <h2 className="lg:text-4xl text-xl font-extrabold  ">
            2025 NIGERIA PHARMACEUTICAL INDUSTRY <br/> GROWTH AND INVESTMENT SUMMIT
          </h2>
          <p className="lg:text-lg text-xs">
            The exclusive gathering where pharmaceutical  <br/>  innovation meets capital opportunity
          </p>
         
         <Link href="/pages/register" className="flex  justify-left lg:justify-center items-center">
         <button className="bg-[#76C14C]  lg:px-6 lg:py-3 p-2 rounded-md hover:bg-[#76C14C] ">
            Register now
          </button>
         </Link>
         
        </div>

        
        </div>

        
      </header>
    );
  };
  
  export default Header;
  