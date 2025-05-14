"use client";
import { useState, useEffect } from "react";

interface Registration {
  _id: string;
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
  status: string;
  createdAt: string;
  phoneNumber: String, // Added phone number field
}

export default function AdminPanel() {
  const [applications, setApplications] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null); // Track which application is being processed
  const [showModal, setShowModal] = useState(false); // For confirmation modal
  const [modalAction, setModalAction] = useState<{ id: string; status: string } | null>(null); // Store the action to confirm
  const [showDetailsModal, setShowDetailsModal] = useState(false); // For user details modal
  const [selectedApplication, setSelectedApplication] = useState<Registration | null>(null); // Store the selected application for details

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"; // Fallback to localhost

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/api/applications`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Fetched applications:", data);
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setProcessing(id); // Show processing indicator for this application
    try {
      const res = await fetch(`${API_URL}/api/applications/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      await fetchApplications(); // Refresh the applications list
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setProcessing(null); // Hide processing indicator
      setShowModal(false); // Close the confirmation modal
      setModalAction(null); // Reset the modal action
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    setModalAction({ id, status }); // Store the action to confirm
    setShowModal(true); // Show the confirmation modal
  };

  const confirmAction = () => {
    if (modalAction) {
      updateStatus(modalAction.id, modalAction.status); // Proceed with the status update
    }
  };

  const openDetailsModal = (app: Registration) => {
    setSelectedApplication(app); // Set the selected application
    setShowDetailsModal(true); // Show the details modal
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Registration Applications</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => openDetailsModal(app)} // Open details modal on row click
              >
                <td className="py-3 px-4">
                  {app.title} {app.firstName} {app.surname}
                </td>
                <td className="py-3 px-4">{app.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      app.status === "PENDING"
                        ? "bg-yellow-200 text-yellow-800"
                        : app.status === "APPROVED"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  {app.status === "PENDING" && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering
                          handleStatusChange(app._id, "APPROVED");
                        }}
                        disabled={processing === app._id}
                        className={`relative bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {processing === app._id ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "Accept"
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering
                          handleStatusChange(app._id, "REJECTED");
                        }}
                        disabled={processing === app._id}
                        className={`relative bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {processing === app._id ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are You Sure?</h2>
            <p className="mb-6">
              Are you sure you want to{" "}
              {modalAction?.status === "APPROVED" ? "approve" : "reject"} this
              application?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`${
                  modalAction?.status === "APPROVED"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-4 py-2 rounded`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              Application Details - {selectedApplication.title}{" "}
              {selectedApplication.firstName} {selectedApplication.surname}
            </h2>
            <div className="space-y-4">
              <div>
                <strong>Title:</strong> {selectedApplication.title}
              </div>
              <div>
                <strong>First Name:</strong> {selectedApplication.firstName}
              </div>
              <div>
                <strong>Surname:</strong> {selectedApplication.surname}
              </div>
              <div>
                <strong>Email:</strong> {selectedApplication.email}
              </div>
              <div>
                <strong>Phone no:</strong> {selectedApplication.phoneNumber}
              </div>
              <div>
                <strong>Organization:</strong>{" "}
                {selectedApplication.organization}
              </div>
              <div>
                <strong>Job Designation:</strong>{" "}
                {selectedApplication.jobDesignation}
              </div>
              <div>
                <strong>Headquarters:</strong>{" "}
                {selectedApplication.headquarters}
              </div>
              <div>
                <strong>Category:</strong> {selectedApplication.category}
              </div>
              <div>
                <strong>Mode:</strong> {selectedApplication.mode}
              </div>
              <div>
                <strong>Networking Interests:</strong>{" "}
                {selectedApplication.networking.join(", ")}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    selectedApplication.status === "PENDING"
                      ? "bg-yellow-200 text-yellow-800"
                      : selectedApplication.status === "APPROVED"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {selectedApplication.status}
                </span>
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {new Date(selectedApplication.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}