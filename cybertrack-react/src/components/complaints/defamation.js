import React, { useState } from "react";

export default function Defamation({ onSubmit }) {
  const [formData2, setFormData2] = useState({
    subject: "",
    id_url: "",
    activity: "",
    frauder_name: "",
    suspect_persons: "",
  });

  const [errors, setErrors] = useState({});

  const requiredFields = ["subject", "frauder_name", "id_url"];

  const validateField = (name, value) => {
    if (requiredFields.includes(name)) {
      if (!value.trim()) {
        return "This field is required";
      }
    }
    return "";
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData2);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        {/* Crime Details Section */}
        <div className="bg-white border-2 border-gray-100 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Name of the Fraudster
              </label>
              <input
                type="text"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.frauder_name ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="frauder_name"
                value={formData2.frauder_name}
                onChange={handleChange2}
                placeholder="Full name of the person involved"
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
                Subject
              </label>
              <input
                type="text"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.subject ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="subject"
                value={formData2.subject}
                onChange={handleChange2}
                placeholder="Subject of complaint"
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
                URL of the ID/Profile
              </label>
              <input
                type="url"
                className={`px-4 py-3.5 bg-white text-black w-full text-sm border-2 ${
                  errors.id_url ? "border-red-500" : "border-gray-100"
                } focus:border-blue-500 rounded outline-none transition`}
                name="id_url"
                value={formData2.id_url}
                onChange={handleChange2}
                placeholder="https://example.com"
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
                Activity Type
              </label>
              <select
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="activity"
                value={formData2.activity}
                onChange={handleChange2}
              >
                <option value="">Select Activity</option>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="post">Post</option>
                <option value="financial_loss">Financial Loss</option>
              </select>
            </div>
            <div className="relative flex flex-col md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2">
                Suspected Persons
              </label>
              <textarea
                className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none transition"
                name="suspect_persons"
                value={formData2.suspect_persons}
                onChange={handleChange2}
                placeholder="Names of other involved persons"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex gap-4 justify-center pt-8 pb-4">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
