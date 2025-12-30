import React, { useState } from "react";
import jsPDF from "jspdf";

export default function Others({ onSubmit }) {
  const [formData, setFormData] = useState({
    subject: "",
    id_url: "",
    activity: "",
    frauder_name: "",
    suspect_persons: "",
  });

  const [errors, setErrors] = useState({});
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const requiredFields = ["subject", "frauder_name"];

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

    const introText = `In the above regard, I have submitted a written request to the petitioner/applicant to take action as per the law as the following cyber crime incident has occurred.\n\nThe following is the information about the incident:\n\n1. Subject: ${formData.subject}\n2. Related URL/ID: ${formData.id_url}\n3. Activity Description: ${formData.activity}\n4. Involved Party: ${formData.frauder_name}\n5. Suspect Persons: ${formData.suspect_persons}\n\nI know that the above statement is true and correct. If it is found to be false, I will be held accountable according to the law.`;
    const introLines = doc.splitTextToSize(introText, 180);
    doc.text(10, 40, introLines);
    doc.save("other_crime_complaint.pdf");
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section: Crime Information */}
        <div className="bg-white border-2 border-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b-2 border-blue-500">
            Crime Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Subject of Complaint
              </label>
              <input
                type="text"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.subject ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Briefly describe the subject of complaint"
                required
              />
              {errors.subject && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.subject}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Related URL/ID
              </label>
              <input
                type="url"
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="id_url"
                value={formData.id_url}
                onChange={handleChange}
                placeholder="https://example.com/page"
              />
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Type of Activity
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
                <option value="financial_loss">Financial Loss</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Suspect Information */}
        <div className="bg-white border-2 border-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b-2 border-blue-500">
            Suspect Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Primary Suspect Name
              </label>
              <input
                type="text"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.frauder_name ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="frauder_name"
                value={formData.frauder_name}
                onChange={handleChange}
                placeholder="Name or username of primary suspect"
                required
              />
              {errors.frauder_name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.frauder_name}
                </span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Other Suspect Persons
              </label>
              <textarea
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="suspect_persons"
                value={formData.suspect_persons}
                onChange={handleChange}
                placeholder="Names of other involved persons, one per line or comma-separated"
                rows="3"
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
