import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/notices/");
      // Handle both array and paginated response formats
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
      setNotices(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching notices:", err);
      setError("Failed to load notices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-600 text-lg">Loading notices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <p className="text-red-700 text-lg font-medium">{error}</p>
          <button
            onClick={fetchNotices}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Notices</h1>

      {notices.length === 0 ? (
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">
            No notices available at this time.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {notice.title}
              </h2>
              <p className="text-gray-600 mb-4">{notice.description}</p>
              {notice.file && (
                <div className="mb-4">
                  <a
                    href={notice.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    📎 View Document
                  </a>
                </div>
              )}
              <p className="text-sm text-gray-500">
                Published: {new Date(notice.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
