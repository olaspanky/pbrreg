// components/Navbar.tsx
import Link from 'next/link';
import logo from "../../../public/assets/logo.svg";
import Image from 'next/image';
const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="PBR Life Sciences Logo" className="h-12" />
          </Link>   

        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About us
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-600 hover:text-gray-900">
                Services
              </Link>
            </li>
            <li>
              <Link href="/use-case" className="text-gray-600 hover:text-gray-900">
                Use Case
              </Link>
            </li>
            <li>
              <Link href="/insight" className="text-gray-600 hover:text-gray-900">
                Insight
              </Link>
            </li>
            <li>
              <Link href="/pharmacymetrics" className="text-gray-600 hover:text-gray-900">
                PharmacyMetrics™
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-gray-600 hover:text-gray-900">
                Events
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button className="bg-[#013983] text-white px-4 py-2 rounded hover:bg-[#013983]">
            Access platforms
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
