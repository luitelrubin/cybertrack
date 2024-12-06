import React, { useState } from 'react';
import jsPDF from 'jspdf';


export default function Social() {
  const [formData, setFormData] = useState({
    victim_Name: '',
    date_of_birth: '',
    address: '',
    unique_id: '',
    contact_no: '',
    contact_email: '',
    guardian_no: '',
    description: '',
    medium: '',
    evidence_links: '',
    close_relative: '',
    unique_id_card: null,
    signature: null,
    screenshots: null,
    other_doc: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDownloadButton(true);
  };
  
  const handleDownload = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
  
    doc.setFontSize(12);
    doc.text(date, 150, 10); // Date at the top right
  
    doc.text(10, 20, "Respected Investigator,");
    doc.text(10, 30, "Subject: Request to take action regarding the cyber crime incident.");
  
    const introText = `In the above regard, I have submitted a written request to the petitioner/applicant to take action as per the law as the following cyber crime incident has occurred.\n\nThe following is the information about the incident:\n\n1.Original ID/URL: ${formData.evidence_links}\n2.Medium of Crime: ${formData.medium}\n3.Suspected Culprit: ${formData.unique_id}\n4.Summary of the crime: ${formData.description}\n5.Close Relative of the Suspect: ${formData.close_relative}\n\nI know that the above statement is true and correct. If it is found to be false, I will be held accountable according to the law.\n\nDetails of the applicant:\nName: ${formData.victim_Name}\nDate of Birth: ${formData.date_of_birth}\nAddress: ${formData.address}\nContact No: ${formData.contact_no}\nContact Email: ${formData.contact_email}\nGuardian No: ${formData.guardian_no}`;
    const introLines = doc.splitTextToSize(introText, 180);
    doc.text(10, 40, introLines);
    doc.save('complaint.pdf');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>Social Complaint Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Victim Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="victim_Name"
                    value={formData.victim_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Name/ID of the Suspect</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unique_id"
                    value={formData.unique_id}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Close relative of the Suspect</label>
                  <input
                    type="text"
                    className="form-control"
                    name="close_relative"
                    value={formData.close_relative}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Contact No</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Guardian No</label>
                  <input
                    type="text"
                    className="form-control"
                    name="guardian_no"
                    value={formData.guardian_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Medium</label>
                  <input
                    type="text"
                    className="form-control"
                    name="medium"
                    value={formData.medium}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Evidence Links</label>
                  <input
                    type="text"
                    className="form-control"
                    name="evidence_links"
                    value={formData.evidence_links}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Unique ID Card</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, 'unique_id_card')}
                  />
                </div>
                <div className="form-group">
                  <label>Signature</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, 'signature')}
                  />
                </div>
                <div className="form-group">
                  <label>Screenshots</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, 'screenshots')}
                  />
                </div>
                <div className="form-group">
                  <label>Other Documents</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, 'other_doc')}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
              {showDownloadButton && (
                <button
                  onClick={handleDownload}
                  className="btn btn-secondary mt-3"
                >
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}