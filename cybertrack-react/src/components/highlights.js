import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function Highlights() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestNotices();
  }, []);

  const fetchLatestNotices = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notices/");
      console.log("Notices Response:", response.data);

      // Handle both paginated and non-paginated responses
      let latestNotices = [];

      if (response.data.results) {
        // Paginated response
        latestNotices = response.data.results.slice(0, 3);
      } else if (Array.isArray(response.data)) {
        // Direct array response
        latestNotices = response.data.slice(0, 3);
      } else {
        // Single object or unexpected format
        latestNotices = [];
      }

      console.log("Latest Notices:", latestNotices);
      setNotices(latestNotices);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getNoticeImage = (notice) => {
    if (notice.file) {
      return `http://localhost:8000${notice.file}`;
    }
    return "/images/news1.png"; // Default fallback image
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className="container3 mx-auto my-5 w-[90%] text-center">
      <h1
        className="mb-12 text-3xl"
        style={{ color: "var(--text-highlights)" }}
      >
        Highlights
      </h1>

      <div className="highlights flex flex-wrap justify-between gap-8">
        {loading ? (
          <p className="text-center w-full">Loading notices...</p>
        ) : notices.length > 0 ? (
          notices.map((notice, index) => (
            <div
              key={notice.id || index}
              className="boxes bg-background border-[0.2vw] border-border-color rounded-[1vw] shadow-lg overflow-hidden flex-1 min-w-[25%] max-w-[30%] h-auto p-2 relative"
            >
              <div
                className="press font-sans text-base font-semibold text-center py-2 px-4 mt-4 w-4/5 mx-auto"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--background)",
                }}
              >
                Press Release
              </div>
              <p
                className="heading-highlights mt-4 mx-5 text-xl font-semibold leading-6 text-left"
                style={{ color: "var(--primary)" }}
              >
                {notice.title || "Notice Title"}
              </p>
              <div
                className="line h-[0.5vh] w-[90%] my-4 mx-auto"
                style={{ backgroundColor: "var(--primary)" }}
              ></div>
              <p
                className="uploaded_date mt-2 mx-5 text-base font-normal text-left"
                style={{ color: "var(--text)" }}
              >
                {formatDate(notice.published_date || notice.created_at)}
              </p>
              <img
                src={getNoticeImage(notice)}
                alt={notice.title || "notice"}
                className="h-photo mx-auto w-full h-[50%] object-cover mt-3"
              />
              <p
                className="description mt-3 mx-5 text-sm font-normal text-left line-clamp-2"
                style={{ color: "var(--text)" }}
              >
                {truncateText(notice.description || "", 100)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center w-full">No notices available</p>
        )}
      </div>

      <button
        onClick={() => navigate("/notice")}
        className="btn view_highlights bg-transparent border-[0.3vw] border-button rounded-[2vh] text-xl font-semibold py-2 px-6 mt-12 mx-auto cursor-pointer"
        style={{
          color: "var(--primary)",
          borderColor: "var(--primary)",
        }}
      >
        View All
      </button>
    </div>
  );
}
