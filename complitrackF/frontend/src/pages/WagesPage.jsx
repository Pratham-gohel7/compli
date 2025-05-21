import React, { useEffect, useState } from "react";
import axios from "axios";

const WagesPage = () => {
  const [wages, setWages] = useState([]);
  const [file, setFile] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch wage data from backend when component mounts
  useEffect(() => {
    axios.get(`${API_BASE_URL}/wages`)
      .then(response => {
        setWages(response.data);
      })
      .catch(error => {
        console.error("Error fetching wage data:", error);
      });
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to backend
  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios.post(`${API_BASE_URL}/wages/upload`, formData)
      .then(response => {
        alert("File uploaded successfully!");
        window.location.reload();  // Refresh to display new data
      })
      .catch(error => {
        alert("Error uploading file.");
        console.error("Error uploading file:", error);
      });
  };

  return (


    <div className="display-container">

      {/* File Upload Section */}
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleFileUpload} className="upload-btn">Upload File</button>
      </div>

      <h2>Employee Wages</h2>
      {/* Wage Data Table */}
      <div className="table-container">
        <table className="table-data">
          <thead>
            <tr>
              <th>Wage ID</th>
              <th>Employee ID</th>
              <th>Basic Salary</th>
              <th>HRA</th>
              <th>DA</th>
              <th>Other Allowances</th>
              <th>Total Deductions</th>
              <th>Net Salary</th>
              <th>Bonus</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {wages.map((wage, index) => (
              <tr key={index}>
                <td>{wage.wage_id}</td>
                <td>{wage.employee_id}</td>
                <td>{wage.basic_salary}</td>
                <td>{wage.hra}</td>
                <td>{wage.da}</td>
                <td>{wage.other_allowances}</td>
                <td>{wage.total_deductions}</td>
                <td>{wage.net_salary}</td>
                <td>{wage.bonus}</td>
                <td>{wage.payment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default WagesPage;
