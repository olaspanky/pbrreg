"use client"; // For Next.js with App Router

import { useState, useEffect, useRef, FormEvent } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

// Custom Dropdown Component with outside click detection
interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder: string;
  required?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, label, placeholder, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm(""); // Optional: clear search term when closing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <div className="relative">
        <button
          type="button"
          className="border p-2 w-full rounded mt-1 bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value || placeholder}</span>
          <FaChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
            <input
              type="text"
              className="w-full p-2 border-b focus:outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            {filteredOptions.map((option) => (
              <div
                key={option}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface FormData {
  title: string;
  firstName: string;
  surname: string;
  organization: string;
  jobDesignation: string;
  headquarters: string;
  category: string;
  mode: string;
  networking: string[];
  email: string;
  phoneNumber: string; // Added phone number field
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    firstName: "",
    surname: "",
    organization: "",
    jobDesignation: "",
    headquarters: "",
    category: "",
    mode: "",
    networking: [],
    email: "",
    phoneNumber: "", // Initialize phone number
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames: string[] = (data as { name: { common: string } }[])
          .map((country) => country.name.common)
          .sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries(["United States", "United Kingdom", "Canada", "Australia"]);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://pbrregback.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          title: "",
          firstName: "",
          surname: "",
          organization: "",
          jobDesignation: "",
          headquarters: "",
          category: "",
          mode: "",
          networking: [],
          email: "",
          phoneNumber: "", // Reset phone number
        });
      } else {
        alert("Error submitting registration.");
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const networkingOptions = [
    "Private Equity",
    "Venture Capital",
    "Development Finance Institution",
    "Pharmaceutical Manufacturer",
    "Pharmaceutical Importer",
    "Government Agency",
  ];

  const categoryOptions = [
    "Private Equity",
    "Venture Capital",
    "Development Finance Institution",
    "Pharmaceutical Manufacturer",
    "Pharmaceutical Importer",
    "Government Agency",
    "Banks",
    "Other Healthcare Players",
    "Others",
  ];

  const modeOptions = ["Online", "Onsite"];

  // Animation variants (unchanged)
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 12px rgba(1, 57, 131, 0.7)",
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    loading: { scale: 1, transition: { duration: 0.2 } },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: { repeat: Infinity, duration: 1, ease: "linear" },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-9">
      <h1 className="lg:text-3xl text-xl font-bold mb-6 text-center text-gray-800 col-span-full">
        Register Here
      </h1>
      <form
        onSubmit={handleSubmit}
        className="container w-full p-3 lg:p-8 bg-white shadow-lg rounded-lg lg:grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Surname</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name of Organization</label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Job Designation</label>
          <input
            type="text"
            value={formData.jobDesignation}
            onChange={(e) => setFormData({ ...formData, jobDesignation: e.target.value })}
            className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="border p-2 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="\+?[0-9]{7,15}"
            title="Enter a valid phone number (7-15 digits, optional + prefix)"
            placeholder="+1234567890"
            required
          />
        </div>

        <CustomDropdown
          label="Company Headquarters"
          value={formData.headquarters}
          onChange={(value) => setFormData({ ...formData, headquarters: value })}
          options={countries}
          placeholder="Select Country"
          required
        />

        <CustomDropdown
          label="Category of Organization"
          value={formData.category}
          onChange={(value) => setFormData({ ...formData, category: value })}
          options={categoryOptions}
          placeholder="Select Category"
          required
        />

        <CustomDropdown
          label="Mode of Attendance"
          value={formData.mode}
          onChange={(value) => setFormData({ ...formData, mode: value })}
          options={modeOptions}
          placeholder="Select Mode"
          required
        />

        <div className="mb-4 col-span-full">
          <label className="block text-gray-700 font-semibold">Networking Opportunities (Select all that apply)</label>
          {networkingOptions.map((option) => (
            <div key={option} className="flex items-center mt-2">
              <input
                type="checkbox"
                value={option}
                onChange={(e) => {
                  const networking = formData.networking.includes(option)
                    ? formData.networking.filter((item) => item !== option)
                    : [...formData.networking, option];
                  setFormData({ ...formData, networking });
                }}
                checked={formData.networking.includes(option)}
                className="mr-2"
              />
              <label>{option}</label>
            </div>
          ))}
        </div>

        <motion.button
          type="submit"
          className="col-span-2 bg-[#013983] w-62 text-white rounded-lg inline-block py-3 px-6 hover:bg-[#012f6b] transition-colors disabled:opacity-70"
          variants={buttonVariants}
          initial="hidden"
          animate={isSubmitting ? "loading" : "visible"}
          whileHover={!isSubmitting ? "hover" : ""}
          whileTap={!isSubmitting ? "tap" : ""}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.span
              variants={spinnerVariants}
              animate="animate"
              className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            "Complete"
          )}
        </motion.button>
      </form>

      {showSuccess && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-5"
          initial="hidden"
          animate="visible"
          variants={modalVariants}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-[#013983] mb-4">
              REGISTRATION COMPLETE
            </h2>
            <div className="flex justify-center mb-6">
              <div className="bg-black opacity-80 rounded-full p-4">
                <FaCheck className="text-white text-4xl" />
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Congratulations, thank you for completing your registration! We’re excited to have you on board.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-[#013983] text-white py-2 px-6 rounded-lg hover:bg-[#012f6b] transition"
            >
              <Link href="/">Home</Link>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}