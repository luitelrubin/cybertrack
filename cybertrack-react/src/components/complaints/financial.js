import React, { useState } from 'react';

export default function Financial({ onSubmit }) {
  const [formData2, setFormData2] = useState({
    amount: '',
    id_url: '',
    activity: '',
    frauder_name: '',
    fraud_medium: '',
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData2);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>Financial Complaint Form</h4>
              </div>
              <div className="card-body">
                <form className="font-sans m-6 max-w-4xl mx-auto" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-10">
                    <div className="relative flex items-center">
                      <label>Name of the Frauder</label>
                      <input
                        type="text"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        name="frauder_name"
                        value={formData2.frauder_name}
                        onChange={handleChange2}
                        required
                      />
                    </div>
                    <div className="relative flex items-center">
                      <label>Amount</label>
                      <input
                        type="text"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        name="amount"
                        value={formData2.amount}
                        onChange={handleChange2}
                        required
                      />
                    </div>
                    <div className="relative flex items-center">
                      <label>URL of the ID</label>
                      <input
                        type="text"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        name="id_url"
                        value={formData2.id_url}
                        onChange={handleChange2}
                        required
                      />
                    </div>
                    <div className="relative flex items-center">
                      <label>Suspected Person</label>
                      <input
                        type="text"
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        name="suspect_persons"
                        value={formData2.suspect_persons}
                        onChange={handleChange2}
                        required
                      />
                    </div>
                    <div className="relative flex items-center">
                      <label>Fraud Medium</label>
                      <select
                        className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                        name="fraud_medium"
                        value={formData2.fraud_medium}
                        onChange={handleChange2}
                        required
                      >
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
                  </div>
                  <button type="submit" className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}