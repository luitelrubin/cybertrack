import React, { useState } from "react";
import jsPDF from "jspdf";

export default function Social({ onSubmit }) {
  const [formData, setFormData] = useState({
    social_media_name: "",
    hacked_since: "",
    crime_type: "",
    activity: "",
    id_url: "",
    profile_full_name: "",
    language_used: "",
    hacked_id_related_phone_or_email: "",
    device_brand: "",
    device_model: "",
    id_creation_date: "",
    present_active_id_url: "",
  });

  const [errors, setErrors] = useState({});
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const requiredFields = [
    "social_media_name",
    "hacked_since",
    "crime_type",
    "id_url",
    "profile_full_name",
  ];

  const validateField = (name, value) => {
    if (requiredFields.includes(name)) {
      if (!value.trim()) {
        return "This field is required";
      }
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDownloadButton(true);
    onSubmit(formData);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(12);
    doc.text(date, 150, 10);

    doc.text(10, 20, "Respected Investigator,");
    doc.text(
      10,
      30,
      "Subject: Request to take action regarding the cyber crime incident."
    );

    const introText = `In the above regard, I have submitted a written request to the petitioner/applicant to take action as per the law as the following cyber crime incident has occurred.\n\nThe following is the information about the incident:\n\n1. Social Media Platform: ${formData.social_media_name}\n2. Hacked Since: ${formData.hacked_since}\n3. Crime Type: ${formData.crime_type}\n4. Original Account URL: ${formData.id_url}\n5. Profile Full Name: ${formData.profile_full_name}\n6. Device Used: ${formData.device_brand} ${formData.device_model}\n\nI know that the above statement is true and correct. If it is found to be false, I will be held accountable according to the law.`;
    const introLines = doc.splitTextToSize(introText, 180);
    doc.text(10, 40, introLines);
    doc.save("social_complaint.pdf");
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section: Social Media Account Information */}
        <div className="bg-white border-2 border-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b-2 border-blue-500">
            Social Media Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Social Media Platform
              </label>
              <input
                type="text"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.social_media_name
                    ? "border-red-500"
                    : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="social_media_name"
                value={formData.social_media_name}
                onChange={handleChange}
                placeholder="e.g., Facebook, Instagram, Twitter, TikTok"
                required
              />
              {errors.social_media_name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.social_media_name}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Hacked Since
              </label>
              <input
                type="date"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.hacked_since ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="hacked_since"
                value={formData.hacked_since}
                onChange={handleChange}
                required
              />
              {errors.hacked_since && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.hacked_since}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Original Account URL
              </label>
              <input
                type="url"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.id_url ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="id_url"
                value={formData.id_url}
                onChange={handleChange}
                placeholder="https://facebook.com/your-original-account"
                required
              />
              {errors.id_url && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.id_url}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Profile Full Name
              </label>
              <input
                type="text"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.profile_full_name
                    ? "border-red-500"
                    : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="profile_full_name"
                value={formData.profile_full_name}
                onChange={handleChange}
                placeholder="Your original profile full name"
                required
              />
              {errors.profile_full_name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.profile_full_name}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Account Creation Date
              </label>
              <input
                type="date"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="id_creation_date"
                value={formData.id_creation_date}
                onChange={handleChange}
              />
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Current Active Account URL
              </label>
              <input
                type="url"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="present_active_id_url"
                value={formData.present_active_id_url}
                onChange={handleChange}
                placeholder="https://facebook.com/hacker-current-account"
              />
            </div>
          </div>
        </div>

        {/* Section: Crime Details */}
        <div className="bg-white border-2 border-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b-2 border-blue-500">
            Crime Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Type of Crime
              </label>
              <select
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.crime_type ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="crime_type"
                value={formData.crime_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Crime Type</option>
                <option value="profile_modification">
                  Profile Modification
                </option>
                <option value="spam_posting">Spam Posting</option>
                <option value="status_update">Status Update</option>
                <option value="profile_deletion">Profile Deletion</option>
                <option value="account_hack">Account Hack</option>
                <option value="fake_account">Fake Account</option>
                <option value="others">Others</option>
              </select>
              {errors.crime_type && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.crime_type}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Activity Performed
              </label>
              <select
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
              >
                <option value="">Select Activity Type</option>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="post">Post</option>
                <option value="financial_activity">Financial Activity</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Language Used
              </label>
              <input
                type="text"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="language_used"
                value={formData.language_used}
                onChange={handleChange}
                placeholder="e.g., English, Nepali"
              />
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Associated Contact
              </label>
              <input
                type="text"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="hacked_id_related_phone_or_email"
                value={formData.hacked_id_related_phone_or_email}
                onChange={handleChange}
                placeholder="Phone number or email linked to account"
              />
            </div>
          </div>
        </div>

        {/* Section: Device Information */}
        <div className="bg-white border-2 border-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b-2 border-blue-500">
            Device Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Device Brand
              </label>
              <input
                type="text"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="device_brand"
                value={formData.device_brand}
                onChange={handleChange}
                placeholder="e.g., Apple, Samsung"
              />
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Device Model
              </label>
              <input
                type="text"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="device_model"
                value={formData.device_model}
                onChange={handleChange}
                placeholder="e.g., iPhone 12, Galaxy S21"
              />
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex gap-4 justify-center pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
          {showDownloadButton && (
            <button
              type="button"
              onClick={handleDownload}
              className="px-8 py-3 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition-colors"
            >
              Download PDF
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
