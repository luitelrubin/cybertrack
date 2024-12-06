import React, { useState } from 'react';
import Defamation from "./defamation";
import Financial from "./financial";
import Social from "./social";
import Others from "./others";
import jsPDF from 'jspdf';
import axios from "axios";

export default function Complaint() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    complaint_id: '',
    victim_Name: '',
    province: '',
    district: '',
    country: '',
    ward_no: '',
    city: '',
    date_of_birth: '',
    unique_id_number: '',
    contact_no: '',
    contact_email: '',
    guardian_no: '',
    description: '',
    medium: '',
    evidence_links: '',
    unique_id_card: null,
    signature: null,
    screenshots: null,
    other_doc: null,
  });
  const [complaintType, setComplaintType] = useState('');
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
  
    console.log("Combined Data:", combinedData); // Log the combined data being sent
  
    setShowDownloadButton(true);
  
    // Uncomment the API call part when ready to test
    // try {
    //   // Send POST request to the backend API
    //   const response = await axios.post("http://localhost:8000/complaints/create-defamation/", combinedData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
  
    //   if (response.status === 201) {
    //     // Handle successful response
    //     console.log("Complaint submitted successfully");
    //     setShowDownloadButton(true);
    //   }
    // } catch (error) {
    //   console.error("Error submitting complaint:", error);
    // }
  
    console.log('Received data from Defamation:', defamationData);
  };
  const handleFinancialSubmit = async (financialData) => {
    // Combine the initial form data and the financial-specific data
    const combinedData = {
      ...formData,
      ...financialData,
    };
  
    console.log("Combined Data:", combinedData); // Log the combined data being sent
  
    setShowDownloadButton(true);
  
    // Uncomment the API call part when ready to test
    // try {
    //   // Send POST request to the backend API
    //   const response = await axios.post("http://localhost:8000/complaints/create-financial/", combinedData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
  
    //   if (response.status === 201) {
    //     // Handle successful response
    //     console.log("Complaint submitted successfully");
    //     setShowDownloadButton(true);
    //   }
    // } catch (error) {
    //   console.error("Error submitting complaint:", error);
    // }
  
    console.log('Received data from Financial:', financialData);
  };
  const handleSocialSubmit = (data) => {
    setSocialData(data);
    console.log('Received data from Social:', data);
  }
  const handleOthersSubmit = (data) => {
    setOthersData(data);
    console.log('Received data from Others:', data);
  }
  const onComplaintTypeChange = (event) => {
    setComplaintType(event.target.value);
  };

  const [districts, setDistricts] = useState([]);

  const DISTRICT_CHOICES = {
    "Select Province": [
      ["Select District", "Select District"],
    ],
    "Province 1": [
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
    "Province 2": [
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
    const randomComplaintId = Math.floor(1000000 + Math.random() * 9000000).toString();
    setFormData({
      ...formData,
      complaint_id: randomComplaintId,
    });
    setPage(2);
  };
  const handleDownload = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(12);
    doc.text(date, 150, 10); // Date at the top right

    doc.text(10, 20, "Respected Investigator,");
    doc.text(10, 30, "Subject: Request to take action regarding the cyber crime incident.");

    const introText = `In the above regard, I have submitted a written request to the petitioner/applicant to take action as per the law as the following cyber crime incident has occurred.\n\nThe following is the information about the incident:\n\n1.Original ID/URL: ${formData.evidence_links}\n2.Medium of Crime: ${formData.medium}\n3.Unique Id Number: ${formData.unique_id_number}\n4.Summary of the crime: ${formData.description}\n\nI know that the above statement is true and correct. If it is found to be false, I will be held accountable according to the law.\n\nDetails of the applicant:\nName: ${formData.victim_Name}\nDate of Birth: ${formData.date_of_birth}\nAddress: ${formData.city}\nContact No: ${formData.contact_no}\nContact Email: ${formData.contact_email}\nGuardian No: ${formData.guardian_no}`;
    const introLines = doc.splitTextToSize(introText, 180);
    doc.text(10, 40, introLines);
    doc.save('complaint.pdf');
  };

  return (
    <div>
      <h1>File a Complaint</h1>
      <select onChange={onComplaintTypeChange}>
        <option>Select Complaint Type</option>
        <option value="defamation">Defamation</option>
        <option value="financial">Financial</option>
        <option value="social">Social</option>
        <option value="others">Others</option>
      </select>

      {page === 1 && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h4>Defamation Complaint Form</h4>
                </div>
                <div className="card-body">
                  <form className="font-sans m-6 max-w-4xl mx-auto" onSubmit={handleNext}>
                    <div className="grid sm:grid-cols-2 gap-10">
                      <div className="relative flex items-center">
                        <label>Victim Name</label>
                        <input
                          type="text"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="victim_Name"
                          value={formData.victim_Name}
                          onChange={handleChange}

                          required
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Country</label>
                        <select
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        >
                          <option value="">Select Country</option>
                          <option value="Nepal">Nepal</option>
                        </select>
                      </div>
                      <div className="relative flex items-center">
                        <label>Province</label>
                        <select
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="province"
                          value={formData.province}
                          onChange={handleProvinceChange}
                        >
                          <option value="">Select Province</option>
                          <option value="Province 1">Province 1</option>
                          <option value="Province 2">Province 2</option>
                          <option value="Bagmati Province">Bagmati Province</option>
                          <option value="Gandaki Province">Gandaki Province</option>
                          <option value="Lumbini Province">Lumbini Province</option>
                          <option value="Karnali Province">Karnali Province</option>
                          <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                        </select>
                      </div>

                      <div className="relative flex items-center">
                        <label>District</label>
                        <select
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                        >
                          <option value="">Select District</option>
                          {districts.map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative flex items-center">
                        <label>City</label>
                        <input
                          type="text"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Unique ID</label>
                        <input
                          type="text"
                          placeholder='Citizenship / Passport / Driving License'
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="unique_id_number"
                          value={formData.unique_id_number}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Contact No</label>
                        <input
                          type="text"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="contact_no"
                          value={formData.contact_no}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Contact Email</label>
                        <input
                          type="email"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="contact_email"
                          value={formData.contact_email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Guardian No</label>
                        <input
                          type="text"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="guardian_no"
                          value={formData.guardian_no}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Description</label>
                        <textarea
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="relative flex items-center">
                        <label>Medium</label>
                        <select>
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="medium"
                          value={formData.medium}
                          onChange={handleChange}
                          <option value="">Select Medium</option>
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
                      <div className="relative flex items-center">
                        <label>Evidence Links</label>
                        <input
                          type="text"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          name="evidence_links"
                          value={formData.evidence_links}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Unique ID Card</label>
                        <input
                          type="file"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          onChange={(e) => handleFileChange(e, 'unique_id_card')}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Signature</label>
                        <input
                          type="file"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          onChange={(e) => handleFileChange(e, 'signature')}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Screenshots</label>
                        <input
                          type="file"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          onChange={(e) => handleFileChange(e, 'screenshots')}
                        />
                      </div>
                      <div className="relative flex items-center">
                        <label>Other Documents</label>
                        <input
                          type="file"
                          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                          onChange={(e) => handleFileChange(e, 'other_doc')}
                        />
                      </div>

                    </div>
                    <button type="submit" className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">
                      Next
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {page === 2 && (
        <div>
          {complaintType === 'defamation' && <Defamation onSubmit={handleDefamationSubmit} />}
          {complaintType === 'financial' && <Financial onSubmit={handleFinancialSubmit} />}
          {complaintType === 'social' && <Social onSubmit={handleSocialSubmit} />}
          {complaintType === 'others' && <Others onSubmit={handleOthersSubmit} />}
        </div>
      )}
      {showDownloadButton && (
        <button
          onClick={handleDownload}
          className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          Download PDF
        </button>
      )}

    </div>
  );
}