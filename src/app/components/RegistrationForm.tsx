"use client"
import { useState, FormEvent } from "react";
import { FaCheck } from "react-icons/fa"; // Import the checkmark icon


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
  email: string; // Add email field
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
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
        email: "", // Reset email field
      });
    } else {
      alert("Error submitting registration.");
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="container w-full p-8 bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 col-span-full">
          Register Here
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Surname</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Name of Organization</label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Job Designation</label>
          <input
            type="text"
            value={formData.jobDesignation}
            onChange={(e) => setFormData({ ...formData, jobDesignation: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Company Headquarters</label>
          <select
            value={formData.headquarters}
            onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Country</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Category of Organization</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Private Equity">Private Equity</option>
            <option value="Venture Capital">Venture Capital</option>
            <option value="Development Finance Institution">Development Finance Institution</option>
            <option value="Pharmaceutical Manufacturer">Pharmaceutical Manufacturer</option>
            <option value="Pharmaceutical Importer">Pharmaceutical Importer</option>
            <option value="Government Agency">Government Agency</option>
            <option value="Banks">Banks</option>
            <option value="Other Healthcare Players">Other Players in the Healthcare Value Chain</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Mode of Attendance</label>
          <select
            value={formData.mode}
            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
            className="border p-3 w-full rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>

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

        <button
        type="submit"
        className="col-span-2 bg-[#013983] w-62  text-white rounded-lg inline-block py-3 px-6 ronded hover:bg-[#013983] transition-colors"
      >
        Complete 
      </button>
      </form>

     {/* Success Modal */}
     {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-[#013983] mb-4">
              REGISTRATION COMPLETE
            </h2>

            {/* Checkmark Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-black rounded-full p-4">
                <FaCheck className="text-white text-4xl" />
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-800 mb-6">
              Congratulations, thank you for completing your registration! We’re excited to have you on board.
            </p>

            {/* Close Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-[#013983] text-white py-2 px-6 rounded-lg hover:bg-[#012f6b] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
