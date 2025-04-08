// components/AdminPanel.tsx
"use client";
import { useState, useEffect } from "react";

interface Registration {
  _id: string; // Change from "id: number" to "_id: string" (MongoDB IDs are strings)
  title: string;
  firstName: string;
  surname: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [applications, setApplications] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("https://pbrregback.vercel.app/api/applications");
      const data = await res.json();
      console.log("Fetched applications:", data); // Add this line
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const updateStatus = async (id: string, status: string) => { // Change id: number to id: string
    try {
      await fetch(`https://pbrregback.vercel.app/api/applications/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
    <tr key={app._id} className="border-b"> 
      <td className="py-3 px-4">{app.title} {app.firstName} {app.surname}</td>
      <td className="py-3 px-4">{app.email}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded ${app.status === 'PENDING' ? 'bg-yellow-200' : app.status === 'ACCEPTED' ? 'bg-green-200' : 'bg-red-200'}`}>
          {app.status}
        </span>
      </td>
      <td className="py-3 px-4 space-x-2">
        {app.status === 'PENDING' && (
          <>
            <button
              onClick={() => updateStatus(app._id, 'ACCEPTED')} 
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus(app._id, 'REJECTED')} 
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}