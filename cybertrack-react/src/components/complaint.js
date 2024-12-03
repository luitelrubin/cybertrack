import React, { useState } from 'react';
import Defamation from "./defamation";
import Financial from "./financial";
import Social from "./social";
import Others from "./others";

export default function Complaint() {
  const [complaintType, setComplaintType] = useState('');

  const onComplaintTypeChange = (event) => {
    setComplaintType(event.target.value);
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

      {complaintType === 'defamation' && <Defamation />}
      {complaintType === 'financial' && <Financial />}
      {complaintType === 'social' && <Social />}
      {complaintType === 'others' && <Others />}
    </div>
  );
}