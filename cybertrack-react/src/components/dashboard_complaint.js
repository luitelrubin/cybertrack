import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DashboardComplaint({ data1, data2 }) {
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComplaints(data1, data2);
  }, [data1, data2]);

  const fetchComplaints = async (complaintType, status) => {
    try {
      setLoading(true);
      // Build query parameters - only add if not "all"
      let url = "http://localhost:8000/complaints/";
      const params = new URLSearchParams();

      // Only filter by type if it's not "all"
      if (complaintType && complaintType !== "all") {
        params.append("complaint_type", complaintType);
      }

      // Only filter by status if it's not "all"
      if (status && status !== "all") {
        // Map frontend status to backend status values
        const statusMap = {
          pending: "Pending",
          inaction: "In Action",
          scam: "Scam",
          resolved: "Resolved",
          closed: "Closed",
        };
        params.append("status", statusMap[status] || status);
      }

      if (params.toString()) {
        url += "?" + params.toString();
      }

      console.log("Fetching from URL:", url);
      const response = await axios.get(url);
      console.log("Raw API Response:", response);
      console.log("Response data:", response.data);
      console.log("Response status:", response.status);

      let data = [];

      // Handle both array and paginated response formats
      if (Array.isArray(response.data)) {
        data = response.data;
        console.log("Response is array:", data);
      } else if (response.data && response.data.results) {
        // Paginated response
        data = response.data.results;
        console.log("Response is paginated:", data);
      } else if (
        response.data &&
        typeof response.data === "object" &&
        !Array.isArray(response.data)
      ) {
        // Might be a single object response
        console.warn("Unexpected response format:", response.data);
        data = [];
      }

      console.log("Final processed data:", data, "Length:", data.length);
      setFilteredComplaints(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to load complaints. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getComplaintType = (complaint) => {
    // The API includes complaint_type field from serializer
    return complaint.complaint_type || "unknown";
  };

  const getStatusBadge = (status) => {
    // Map backend status values to color classes
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      "In Action": "bg-blue-100 text-blue-800",
      Scam: "bg-orange-100 text-orange-800",
      Resolved: "bg-green-100 text-green-800",
      Closed: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getComplaintTypeDisplay = (complaint) => {
    const type = getComplaintType(complaint);
    const displayNames = {
      financial: "Financial Fraud",
      social: "Social Media Hack",
      defamation: "Defamation",
      others: "Other Crime",
      unknown: "Unknown",
    };
    return displayNames[type] || type;
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-600 text-lg">Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <p className="text-red-700 text-lg font-medium">{error}</p>
          <button
            onClick={() => fetchComplaints(data1, data2)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-center mb-6">
        <div className="rounded-3xl w-48 bg-blue-200 px-6 py-4">
          <h2 className="text-center font-semibold text-gray-800">
            Total Cases: {filteredComplaints.length}
          </h2>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">
            No complaints available for this filter.
          </p>
        </div>
      ) : (
        <div className="font-sans overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Complaint ID
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Victim Name
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Email
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Type
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Contact
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Date
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {filteredComplaints.map((complaint) => (
                <tr
                  key={complaint.complaint_id}
                  className="hover:bg-gray-50 border-t"
                >
                  <td className="p-4 text-[15px] text-gray-800 font-medium">
                    {complaint.complaint_id || complaint.id}
                  </td>
                  <td className="p-4 text-[15px] text-gray-800">
                    {complaint.victim_Name}
                  </td>
                  <td className="p-4 text-[15px] text-gray-800">
                    {complaint.contact_email}
                  </td>
                  <td className="p-4 text-[15px] text-gray-800">
                    {getComplaintTypeDisplay(complaint)}
                  </td>
                  <td className="p-4 text-[15px] text-gray-800">
                    {complaint.contact_no}
                  </td>
                  <td className="p-4 text-[15px] text-gray-800">
                    {new Date(complaint.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        complaint.status
                      )}`}
                    >
                      {complaint.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
