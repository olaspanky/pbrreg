import Image from 'next/image';
import p1 from "../../../public/assets/p1.png";
import Countdown from './Count';
// components/Header.tsx
const Header = () => {
    return (
<header
  className="relative flex justify-center items-center bg-cover bg-center"
  style={{
    backgroundImage: `url('/assets/bg2.png')`, // Path to your image
  }}
>
  {/* Overlay for blue tint */}
  <div className="absolute inset-0 bg-[#013983] opacity-70 py-20"></div>      
    <div className="relative flex flex-col lg:flex-row z-10 text-white p-5 lg:p-10  gap-5 justify-between items-center max-w-[1420px]">
        <div className=" w-full container text-left  flex flex-col gap-3 lg:gap-7 lg:w-1/2">
          <h1 className="text-xs lg:text-lg font-bold ">
            UNLOCK NIGERIA'S PHARMACEUTICAL FRONTIER
          </h1>
          <h2 className="lg:text-4xl text-xl font-extrabold  ">
            2025 NIGERIA PHARMACEUTICAL  INDUSTRY  GROWTH AND  INVESTMENT SUMMIT
          </h2>
          <p className="text-xs lg:text-lg">
            The exclusive gathering where pharmaceutical    innovation meets capital opportunity
          </p>
         
      
         
        </div>

        <div className='w-1/2'>
        <Countdown />
        </div>

        
        </div>

        
      </header>
    );
  };
  
  export default Header;
  