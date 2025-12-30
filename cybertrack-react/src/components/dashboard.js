import React, { useState, useContext } from "react";
import DashboardComplaint from "./dashboard_complaint";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { auth, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("defamation"); // Tracks the active tab for styling
  const [activeButton, setActiveButton] = useState("all"); // Tracks the active button for styling

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the active button for styling
  };
  return (
    <div className="flex flex-col min-h-screen">
      {auth.isAuthenticated ? (
        <>
          <div className="flex flex-1">
            {/* Left Sidebar - 20% width */}
            <div className="w-1/5 bg-gray-100 p-4 border-r rounded-l-lg">
              <nav className="space-y-4">
                {/* Defamation Tab */}
                <a
                  className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                    activeTab === "defamation"
                      ? "bg-blue-200 text-blue-800"
                      : ""
                  }`}
                  onClick={() => handleTabClick("defamation")}
                >
                  Defamation Crime
                </a>

                {/* Social Media Crime Tab */}
                <a
                  className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                    activeTab === "social" ? "bg-blue-200 text-blue-800" : ""
                  }`}
                  onClick={() => handleTabClick("social")}
                >
                  Social Media Crime
                </a>

                {/* Financial Crime Tab */}
                <a
                  className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                    activeTab === "financial" ? "bg-blue-200 text-blue-800" : ""
                  }`}
                  onClick={() => handleTabClick("financial")}
                >
                  Financial Crime
                </a>

                {/* Other Crimes Tab */}
                <a
                  className={`text-black text-sm flex items-center hover:text-[#007bff] hover:border-r-[5px] border-[#077bff] hover:bg-gray-100 px-8 py-4 transition-all ${
                    activeTab === "others" ? "bg-blue-200 text-blue-800" : ""
                  }`}
                  onClick={() => handleTabClick("others")}
                >
                  Other Crimes
                </a>
              </nav>
            </div>

            {/* Right Container - 80% width */}
            <div className="w-4/5 flex flex-col">
              {/* Status Tabs */}
              <div className="w-full bg-white border-b-2 border-gray-200">
                <div className="flex space-x-1 px-6">
                  <button
                    className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-4 ${
                      activeButton === "all"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("all")}
                  >
                    All Status
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-4 ${
                      activeButton === "pending"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("pending")}
                  >
                    Pending
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-4 ${
                      activeButton === "inaction"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("inaction")}
                  >
                    In Action
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-4 ${
                      activeButton === "scam"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("scam")}
                  >
                    Spam
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-4 ${
                      activeButton === "resolved"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("resolved")}
                  >
                    Resolved
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-4 ${
                      activeButton === "closed"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                    onClick={() => handleButtonClick("closed")}
                  >
                    Closed
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {activeTab === "defamation" && (
                  <DashboardComplaint data1={activeTab} data2={activeButton} />
                )}
                {activeTab === "social" && (
                  <DashboardComplaint data1={activeTab} data2={activeButton} />
                )}
                {activeTab === "financial" && (
                  <DashboardComplaint data1={activeTab} data2={activeButton} />
                )}
                {activeTab === "others" && (
                  <DashboardComplaint data1={activeTab} data2={activeButton} />
                )}
              </div>

              {/* Logout Button - Above Footer */}
              <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
                <button
                  onClick={logout}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Not Authenticated</h1>
      )}
    </div>
  );
}
