import React, { useState, useEffect } from "react";
import axios from "axios";

const STATUS_CHOICES = ["Pending", "In Action", "Scam", "Resolved", "Closed"];

export default function DashboardComplaint({ data1, data2 }) {
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);

  // Configure axios to include authentication token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

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
    // Convert numeric status to string if needed, then map to colors
    let displayStatus = status;
    if (status === 1) {
      displayStatus = "Pending";
    }

    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      "In Action": "bg-blue-100 text-blue-800",
      Scam: "bg-orange-100 text-orange-800",
      Resolved: "bg-green-100 text-green-800",
      Closed: "bg-red-100 text-red-800",
    };
    return statusColors[displayStatus] || "bg-gray-100 text-gray-800";
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

  const handleEditClick = (complaint) => {
    setEditingComplaint(complaint);
    setEditingStatus(complaint.status === 1 ? "Pending" : complaint.status);
    setIsEditModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!editingComplaint) return;

    try {
      // Map complaint_type from API format to URL format
      let complaintType = editingComplaint.complaint_type || "others";
      const typeMap = {
        financial: "financial_fraud",
        social: "social_media_hack",
        defamation: "defamation",
        others: "other",
      };
      const urlComplaintType = typeMap[complaintType] || complaintType;

      const response = await axios.put(
        `http://localhost:8000/complaints/update-complaint/${urlComplaintType}/${editingComplaint.complaint_id}/`,
        { status: editingStatus }
      );
      console.log("Status updated:", response.data);
      setIsEditModalOpen(false);
      setNotification({
        type: "success",
        message: "Status updated successfully!",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      fetchComplaints(data1, data2);
    } catch (err) {
      console.error("Error updating status:", err);
      setNotification({
        type: "error",
        message:
          "Failed to update status: " +
          (err.response?.data?.error || err.message),
      });
    }
  };

  const handleDeleteComplaint = (complaint) => {
    setComplaintToDelete(complaint);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    if (!complaintToDelete) return;

    try {
      // Delete endpoint expects original API format (financial, social, defamation, others)
      const complaintType = complaintToDelete.complaint_type || "others";

      await axios.delete(
        `http://localhost:8000/complaints/delete-complaint/${complaintType}/${complaintToDelete.complaint_id}/`
      );
      console.log("Complaint deleted successfully");
      setNotification({
        type: "success",
        message: "Complaint deleted successfully",
      });
      setShowDeleteConfirmation(false);
      setComplaintToDelete(null);
      // Refresh the complaints list after 1 second
      setTimeout(() => {
        fetchComplaints(data1, data2);
      }, 1000);
    } catch (err) {
      console.error("Error deleting complaint:", err);
      setNotification({
        type: "error",
        message:
          "Failed to delete complaint: " +
          (err.response?.data?.error || err.message),
      });
      setShowDeleteConfirmation(false);
    }
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
                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                  Actions
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
                      {complaint.status === 1
                        ? "Pending"
                        : complaint.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEditClick(complaint)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComplaint(complaint)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Status Modal */}
      {isEditModalOpen && editingComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Edit Complaint Status
            </h2>
            <p className="text-gray-600 mb-4">
              Complaint ID: {editingComplaint.complaint_id}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={editingStatus}
                onChange={(e) => setEditingStatus(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded focus:border-blue-500 outline-none"
              >
                {STATUS_CHOICES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && complaintToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Delete Complaint
            </h2>
            <p className="text-gray-600 mb-2">
              Are you sure you want to delete complaint{" "}
              <span className="font-semibold">
                {complaintToDelete.complaint_id}
              </span>
              ?
            </p>
            <p className="text-gray-500 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setComplaintToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmation}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-lg leading-none hover:opacity-70"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
