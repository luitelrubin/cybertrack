import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DashboardComplaint({ data1, data2 }) {
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    // Filter complaints whenever data1 (tab) or data2 (status button) changes
    filterComplaints(data1, data2);
  }, [data1, data2, allComplaints]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/complaints/");
      console.log("API Response:", response.data);
      // Handle both array and paginated response formats
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
      console.log("Fetched complaints:", data);
      setAllComplaints(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to load complaints. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getComplaintType = (complaint) => {
    // Use the complaint_type field from API
    if (complaint.complaint_type) {
      return complaint.complaint_type;
    }

    // Fallback to field detection if type not provided
    if (complaint.amount) return "financial";
    if (complaint.social_media_name) return "social";
    if (complaint.activity && complaint.frauder_name) return "defamation";
    if (complaint.subject) return "others";
    return "unknown";
  };

  const getStatusValue = (buttonName) => {
    const statusMap = {
      pending: "Pending",
      inaction: "In Action",
      scam: "Scam",
      resolved: "Resolved",
      closed: "Closed",
    };
    return statusMap[buttonName] || buttonName;
  };

  const filterComplaints = (tabType, statusButton) => {
    let filtered = allComplaints;

    console.log(
      "Filtering with tabType:",
      tabType,
      "statusButton:",
      statusButton
    );
    console.log("All complaints before filter:", allComplaints);

    // If no filters are selected, show all
    if (!tabType || !statusButton) {
      setFilteredComplaints(allComplaints);
      return;
    }

    // Filter by complaint type (tab)
    if (tabType && tabType !== "all") {
      filtered = filtered.filter(
        (complaint) => getComplaintType(complaint) === tabType
      );
      console.log("After type filter:", filtered);
    }

    // Filter by status (button)
    if (statusButton && statusButton !== "all") {
      const statusValue = getStatusValue(statusButton);
      filtered = filtered.filter(
        (complaint) => complaint.status === statusValue
      );
      console.log("After status filter:", filtered);
    }

    console.log("Final filtered complaints:", filtered);
    setFilteredComplaints(filtered);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      closed: "bg-red-100 text-red-800",
      spam: "bg-orange-100 text-orange-800",
      under_review: "bg-blue-100 text-blue-800",
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
            onClick={fetchComplaints}
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
                <tr key={complaint.id} className="hover:bg-gray-50 border-t">
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
