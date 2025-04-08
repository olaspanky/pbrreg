"use client"
// components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Hamburger icon animation variants
  const barVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 },
  };

  const middleBarVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 },
  };

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="PBR Life Sciences Logo" className="lg:h-12 h-6 w-auto" />
          </Link>
        </div>

        {/* Hamburger Menu (Visible on Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-gray-600"
                variants={barVariants}
                animate={isOpen ? "open" : "closed"}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-600"
                variants={middleBarVariants}
                animate={isOpen ? "open" : "closed"}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-600"
                variants={bottomBarVariants}
                animate={isOpen ? "open" : "closed"}
              />
            </div>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/use-case" className="text-gray-600 hover:text-gray-900 transition-colors">
                Use Case
              </Link>
            </li>
            <li>
              <Link href="/insight" className="text-gray-600 hover:text-gray-900 transition-colors">
                Insight
              </Link>
            </li>
            <li>
              <Link href="/pharmacymetrics" className="text-gray-600 hover:text-gray-900 transition-colors">
                PharmacyMetrics™
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-gray-600 hover:text-gray-900 transition-colors">
                Events
              </Link>
            </li>
          </ul>
          <button className="bg-[#013983] text-white px-4 py-2 rounded hover:bg-[#012e63] transition-colors">
            Access platforms
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white absolute left-0 right-0 top-full shadow-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/use-case"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Use Case
                </Link>
              </li>
              <li>
                <Link
                  href="/insight"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Insight
                </Link>
              </li>
              <li>
                <Link
                  href="/pharmacymetrics"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  PharmacyMetrics™
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
              </li>
              <li>
                <button
                  className="bg-[#013983] text-white px-4 py-2 rounded hover:bg-[#012e63] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Access platforms
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;