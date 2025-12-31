import React, { useState, useContext } from "react";
import Defamation from "./defamation";
import Financial from "./financial";
import Social from "./social";
import Others from "./others";
import jsPDF from "jspdf";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Complaint() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    complaint_id: "",
    victim_Name: "",
    province: "",
    district: "",
    country: "",
    ward_no: "",
    city: "",
    date_of_birth: "",
    unique_id_number: "",
    contact_no: "",
    contact_email: "",
    guardian_no: "",
    description: "",
    medium: "FB",
    evidence_links: "",
    unique_id_card: null,
    signature: null,
    screenshots: null,
    other_doc: null,
  });
  const [complaintType, setComplaintType] = useState("");
  const [defamationData, setDefamationData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [socialData, setSocialData] = useState(null);
  const [othersData, setOthersData] = useState(null);

  const handleDefamationSubmit = async (defamationData) => {
    // Combine the initial form data and the defamation-specific data
    const combinedData = {
      ...formData,
      ...defamationData,
    };

    console.log("Combined Data:", combinedData);

    setShowDownloadButton(true);

    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();

      // Required fields that should always be included
      const requiredFields = [
        "description",
        "medium",
        "contact_no",
        "contact_email",
      ];

      // Add all fields to FormData
      for (const key in combinedData) {
        const value = combinedData[key];

        // Include if: not null/undefined, OR it's a required field
        if (
          (value !== null && value !== undefined && value !== "") ||
          requiredFields.includes(key)
        ) {
          // Convert ward_no to integer
          if (key === "ward_no" && value) {
            formDataToSend.append(key, parseInt(value, 10));
          } else if (value instanceof File) {
            // Only append actual File objects
            formDataToSend.append(key, value);
          } else if (value !== null && value !== undefined) {
            // Append the value (including empty string for validation)
            formDataToSend.append(key, value);
          }
        }
      }

      // Send POST request to the backend API
      const response = await axios.post(
        "http://localhost:8000/complaints/create-defamation/",
        formDataToSend
      );

      if (response.status === 201) {
        // Handle successful response
        console.log("Complaint submitted successfully");
        alert("Defamation complaint submitted successfully!");
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
    }
  };
  const handleFinancialSubmit = async (financialData) => {
    // Combine the initial form data and the financial-specific data
    const combinedData = {
      ...formData,
      ...financialData,
    };

    console.log("Combined Data:", combinedData);

    setShowDownloadButton(true);

    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();

      // Required fields that should always be included
      const requiredFields = [
        "description",
        "medium",
        "contact_no",
        "contact_email",
      ];

      // Add all fields to FormData
      for (const key in combinedData) {
        const value = combinedData[key];

        // Include if: not null/undefined, OR it's a required field
        if (
          (value !== null && value !== undefined && value !== "") ||
          requiredFields.includes(key)
        ) {
          // Convert ward_no to integer
          if (key === "ward_no" && value) {
            formDataToSend.append(key, parseInt(value, 10));
          } else if (value instanceof File) {
            // Only append actual File objects
            formDataToSend.append(key, value);
          } else if (value !== null && value !== undefined) {
            // Append the value (including empty string for validation)
            formDataToSend.append(key, value);
          }
        }
      }

      // Send POST request to the backend API
      const response = await axios.post(
        "http://localhost:8000/complaints/create-financial-fraud/",
        formDataToSend
      );

      if (response.status === 201) {
        // Handle successful response
        console.log("Complaint submitted successfully");
        alert("Financial fraud complaint submitted successfully!");
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
    }
  };
  const handleSocialSubmit = async (socialData) => {
    // Combine the initial form data and the social-specific data
    const combinedData = {
      ...formData,
      ...socialData,
    };

    console.log("Combined Data:", combinedData);

    setShowDownloadButton(true);

    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();

      // Required fields that should always be included
      const requiredFields = [
        "description",
        "medium",
        "contact_no",
        "contact_email",
      ];

      // Add all fields to FormData
      for (const key in combinedData) {
        const value = combinedData[key];

        // Include if: not null/undefined, OR it's a required field
        if (
          (value !== null && value !== undefined && value !== "") ||
          requiredFields.includes(key)
        ) {
          // Convert ward_no to integer
          if (key === "ward_no" && value) {
            formDataToSend.append(key, parseInt(value, 10));
          } else if (value instanceof File) {
            // Only append actual File objects
            formDataToSend.append(key, value);
          } else if (value !== null && value !== undefined) {
            // Append the value (including empty string for validation)
            formDataToSend.append(key, value);
          }
        }
      }

      // Send POST request to the backend API
      const response = await axios.post(
        "http://localhost:8000/complaints/create-social-media-hack/",
        formDataToSend
      );

      if (response.status === 201) {
        // Handle successful response
        console.log("Complaint submitted successfully");
        alert("Social media hack complaint submitted successfully!");
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
    }
  };
  const handleOthersSubmit = async (othersData) => {
    // Combine the initial form data and the others-specific data
    const combinedData = {
      ...formData,
      ...othersData,
    };

    console.log("Combined Data:", combinedData);

    setShowDownloadButton(true);

    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();

      // Required fields that should always be included
      const requiredFields = [
        "description",
        "medium",
        "contact_no",
        "contact_email",
      ];

      // Add all fields to FormData
      for (const key in combinedData) {
        const value = combinedData[key];

        // Include if: not null/undefined, OR it's a required field
        if (
          (value !== null && value !== undefined && value !== "") ||
          requiredFields.includes(key)
        ) {
          // Convert ward_no to integer
          if (key === "ward_no" && value) {
            formDataToSend.append(key, parseInt(value, 10));
          } else if (value instanceof File) {
            // Only append actual File objects
            formDataToSend.append(key, value);
          } else if (value !== null && value !== undefined) {
            // Append the value (including empty string for validation)
            formDataToSend.append(key, value);
          }
        }
      }

      // Send POST request to the backend API
      const response = await axios.post(
        "http://localhost:8000/complaints/create-other/",
        formDataToSend
      );

      if (response.status === 201) {
        // Handle successful response
        console.log("Complaint submitted successfully");
        alert("Other crime complaint submitted successfully!");
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
    }
  };
  const onComplaintTypeChange = (event) => {
    setComplaintType(event.target.value);
  };

  const [districts, setDistricts] = useState([]);

  const DISTRICT_CHOICES = {
    "Select Province": [["Select District", "Select District"]],
    "Koshi Province": [
      ["Bhojpur", "Bhojpur"],
      ["Dhankuta", "Dhankuta"],
      ["Ilam", "Ilam"],
      ["Jhapa", "Jhapa"],
      ["Khotang", "Khotang"],
      ["Morang", "Morang"],
      ["Okhaldhunga", "Okhaldhunga"],
      ["Sankhuwasabha", "Sankhuwasabha"],
      ["Solukhumbu", "Solukhumbu"],
      ["Sunsari", "Sunsari"],
      ["Taplejung", "Taplejung"],
      ["Terhathum", "Terhathum"],
      ["Udayapur", "Udayapur"],
    ],
    "Madhesh Province": [
      ["Bara", "Bara"],
      ["Dhanusa", "Dhanusa"],
      ["Mahottari", "Mahottari"],
      ["Parsa", "Parsa"],
      ["Rautahat", "Rautahat"],
      ["Saptari", "Saptari"],
      ["Sarlahi", "Sarlahi"],
      ["Siraha", "Siraha"],
    ],
    "Bagmati Province": [
      ["Bhaktapur", "Bhaktapur"],
      ["Chitwan", "Chitwan"],
      ["Dhading", "Dhading"],
      ["Dolakha", "Dolakha"],
      ["Kathmandu", "Kathmandu"],
      ["Kavrepalanchok", "Kavrepalanchok"],
      ["Lalitpur", "Lalitpur"],
      ["Makawanpur", "Makawanpur"],
      ["Nuwakot", "Nuwakot"],
      ["Ramechhap", "Ramechhap"],
      ["Rasuwa", "Rasuwa"],
      ["Sindhuli", "Sindhuli"],
      ["Sindhupalchok", "Sindhupalchok"],
    ],
    "Gandaki Province": [
      ["Baglung", "Baglung"],
      ["Gorkha", "Gorkha"],
      ["Kaski", "Kaski"],
      ["Lamjung", "Lamjung"],
      ["Manang", "Manang"],
      ["Mustang", "Mustang"],
      ["Myagdi", "Myagdi"],
      ["Nawalpur", "Nawalpur"],
      ["Parbat", "Parbat"],
      ["Syangja", "Syangja"],
      ["Tanahun", "Tanahun"],
    ],
    "Lumbini Province": [
      ["Arghakhanchi", "Arghakhanchi"],
      ["Banke", "Banke"],
      ["Bardiya", "Bardiya"],
      ["Dang", "Dang"],
      ["Gulmi", "Gulmi"],
      ["Kapilvastu", "Kapilvastu"],
      ["Palpa", "Palpa"],
      ["Parasi", "Parasi"],
      ["Pyuthan", "Pyuthan"],
      ["Rolpa", "Rolpa"],
      ["Rukum East", "Rukum East"],
      ["Rupandehi", "Rupandehi"],
    ],
    "Karnali Province": [
      ["Dailekh", "Dailekh"],
      ["Dolpa", "Dolpa"],
      ["Humla", "Humla"],
      ["Jajarkot", "Jajarkot"],
      ["Jumla", "Jumla"],
      ["Kalikot", "Kalikot"],
      ["Mugu", "Mugu"],
      ["Rukum West", "Rukum West"],
      ["Salyan", "Salyan"],
      ["Surkhet", "Surkhet"],
    ],
    "Sudurpashchim Province": [
      ["Achham", "Achham"],
      ["Baitadi", "Baitadi"],
      ["Bajhang", "Bajhang"],
      ["Bajura", "Bajura"],
      ["Dadeldhura", "Dadeldhura"],
      ["Darchula", "Darchula"],
      ["Doti", "Doti"],
      ["Kailali", "Kailali"],
      ["Kanchanpur", "Kanchanpur"],
    ],
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setFormData({
      ...formData,
      province: selectedProvince,
      district: "", // Reset district on province change
    });

    // Update districts based on selected province
    setDistricts(DISTRICT_CHOICES[selectedProvince] || []);
  };

  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.files[0],
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const randomComplaintId = Math.floor(
      1000000 + Math.random() * 9000000
    ).toString();
    setFormData({
      ...formData,
      complaint_id: randomComplaintId,
    });
    // Don't need to set page anymore - form will show based on complaintType
  };
  const handleDownload = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(12);
    doc.text(date, 150, 10); // Date at the top right

    doc.text(10, 20, "Respected Investigator,");
    doc.text(
      10,
      30,
      "Subject: Request to take action regarding the cyber crime incident."
    );

    const introText = `In the above regard, I have submitted a written request to the petitioner/applicant to take action as per the law as the following cyber crime incident has occurred.\n\nThe following is the information about the incident:\n\n1.Original ID/URL: ${formData.evidence_links}\n2.Medium of Crime: ${formData.medium}\n3.Unique Id Number: ${formData.unique_id_number}\n4.Summary of the crime: ${formData.description}\n\nI know that the above statement is true and correct. If it is found to be false, I will be held accountable according to the law.\n\nDetails of the applicant:\nName: ${formData.victim_Name}\nDate of Birth: ${formData.date_of_birth}\nAddress: ${formData.city}\nContact No: ${formData.contact_no}\nContact Email: ${formData.contact_email}\nGuardian No: ${formData.guardian_no}`;
    const introLines = doc.splitTextToSize(introText, 180);
    doc.text(10, 40, introLines);
    doc.save("complaint.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-5xl">
        {/* Check if user is authenticated */}
        {!auth.isAuthenticated ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">
                File a Cybercrime Complaint
              </h1>
            </div>
            <div className="p-12 text-center">
              <div className="inline-block bg-blue-50 border-2 border-blue-300 rounded-lg p-8 max-w-md">
                <svg
                  className="w-16 h-16 text-blue-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Authentication Required
                </h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Please log in to file a complaint
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <h1 className="text-3xl font-bold text-white">
                  File a Cybercrime Complaint
                </h1>
                <p className="text-blue-100 mt-2">
                  Select the type of complaint and provide detailed information
                </p>
              </div>

              {/* Form Container */}
              <div className="p-8">
                <form onSubmit={handleNext} className="space-y-6">
                  {/* Complaint Type Selection - Spanning Full Width */}
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-700 mb-4">
                      Complaint Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      onChange={onComplaintTypeChange}
                      defaultValue=""
                      className="w-full px-6 py-4 text-base font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 border-2 border-blue-400 focus:border-blue-600 rounded-lg outline-none transition-all cursor-pointer hover:from-blue-100 hover:to-blue-200"
                    >
                      <option value="">-- Select Complaint Type --</option>
                      <option value="defamation">Defamation</option>
                      <option value="financial">Financial Fraud</option>
                      <option value="social">Social Media Hack</option>
                      <option value="others">Other Crime</option>
                    </select>
                  </div>

                  {/* Only show form if complaint type is selected */}
                  {complaintType && (
                    <>
                      {/* Personal Information Section */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                          Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Victim Name{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="victim_Name"
                              value={formData.victim_Name}
                              onChange={handleChange}
                              required
                              placeholder="Enter full name"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="date_of_birth"
                              value={formData.date_of_birth}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address Information Section */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                          Address Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Country <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select Country</option>
                              <option value="Nepal">Nepal</option>
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Province <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="province"
                              value={formData.province}
                              onChange={handleProvinceChange}
                              required
                            >
                              <option value="">Select Province</option>
                              <option value="Koshi Province">
                                Koshi Province
                              </option>
                              <option value="Madhesh Province">
                                Madhesh Province
                              </option>
                              <option value="Bagmati Province">
                                Bagmati Province
                              </option>
                              <option value="Gandaki Province">
                                Gandaki Province
                              </option>
                              <option value="Lumbini Province">
                                Lumbini Province
                              </option>
                              <option value="Karnali Province">
                                Karnali Province
                              </option>
                              <option value="Sudurpashchim Province">
                                Sudurpashchim Province
                              </option>
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              District <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="district"
                              value={formData.district}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select District</option>
                              {districts.map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              placeholder="Enter city name"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Ward No <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="ward_no"
                              value={formData.ward_no}
                              onChange={handleChange}
                              required
                              placeholder="Enter ward number"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Unique ID <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="unique_id_number"
                              value={formData.unique_id_number}
                              onChange={handleChange}
                              required
                              placeholder="Citizenship / Passport / License"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Information Section */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                          Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Contact Number{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="contact_no"
                              value={formData.contact_no}
                              onChange={handleChange}
                              required
                              placeholder="+977-9841234567"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Email Address{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="contact_email"
                              value={formData.contact_email}
                              onChange={handleChange}
                              required
                              placeholder="email@example.com"
                            />
                          </div>
                          <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Guardian Number (Optional)
                            </label>
                            <input
                              type="text"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="guardian_no"
                              value={formData.guardian_no}
                              onChange={handleChange}
                              placeholder="+977-1234567890"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Crime Information Section */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                          Crime Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Description{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition resize-none"
                              name="description"
                              rows="5"
                              value={formData.description}
                              onChange={handleChange}
                              required
                              placeholder="Provide detailed description of the incident..."
                            ></textarea>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Medium <span className="text-red-500">*</span>
                            </label>
                            <select
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="medium"
                              value={formData.medium}
                              onChange={handleChange}
                              required
                            >
                              <option value="FB">Facebook</option>
                              <option value="messenger">Messenger</option>
                              <option value="whatsapp">Whatsapp</option>
                              <option value="instagram">Instagram</option>
                              <option value="twitter">Twitter</option>
                              <option value="snapchat">Snapchat</option>
                              <option value="linkedin">Linkedin</option>
                              <option value="others">Others</option>
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Evidence Links (Optional)
                            </label>
                            <input
                              type="url"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition"
                              name="evidence_links"
                              value={formData.evidence_links}
                              onChange={handleChange}
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Document Upload Section */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                          Supporting Documents
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              ID Document
                            </label>
                            <input
                              type="file"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition cursor-pointer file:cursor-pointer"
                              onChange={(e) =>
                                handleFileChange(e, "unique_id_card")
                              }
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Signature
                            </label>
                            <input
                              type="file"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition cursor-pointer file:cursor-pointer"
                              onChange={(e) => handleFileChange(e, "signature")}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Screenshots
                            </label>
                            <input
                              type="file"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition cursor-pointer file:cursor-pointer"
                              onChange={(e) =>
                                handleFileChange(e, "screenshots")
                              }
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                              Other Documents
                            </label>
                            <input
                              type="file"
                              className="px-4 py-3 bg-white text-gray-800 border-2 border-gray-200 focus:border-blue-500 rounded-lg outline-none transition cursor-pointer file:cursor-pointer"
                              onChange={(e) => handleFileChange(e, "other_doc")}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </form>

                {/* Show complaint type specific form below */}
                {complaintType && (
                  <div className="mt-12 pt-8 border-t-4 border-blue-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {complaintType === "defamation" && "Defamation Details"}
                      {complaintType === "financial" &&
                        "Financial Fraud Details"}
                      {complaintType === "social" &&
                        "Social Media Hack Details"}
                      {complaintType === "others" && "Other Crime Details"}
                    </h2>
                    {complaintType === "defamation" && (
                      <Defamation onSubmit={handleDefamationSubmit} />
                    )}
                    {complaintType === "financial" && (
                      <Financial onSubmit={handleFinancialSubmit} />
                    )}
                    {complaintType === "social" && (
                      <Social onSubmit={handleSocialSubmit} />
                    )}
                    {complaintType === "others" && (
                      <Others onSubmit={handleOthersSubmit} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {showDownloadButton && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleDownload}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md"
                >
                  Download PDF
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
