import React, { useState } from 'react';

export default function Financial() {
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
    unique_id_card: null,
    signature: null,
    screenshots: null,
    other_doc: null,
  });

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
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4>Financial Complaint Form</h4>
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
                  <label>Unique ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unique_id"
                    value={formData.unique_id}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}