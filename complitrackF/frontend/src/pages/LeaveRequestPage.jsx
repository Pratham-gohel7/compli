import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveRequestPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch leave requests from backend when component mounts
  useEffect(() => {
    axios.get("http://localhost:5001/api/leave")
      .then(response => {
        setLeaveRequests(response.data);
      })
      .catch(error => {
        console.error("Error fetching leave requests:", error);
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

    axios.post("http://localhost:5001/api/leave/upload", formData)
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

      <h2>Leave Requests</h2>
      {/* Leave Requests Table */}
      <div className="table-container">
        <table className="table-data">
          <thead>
            <tr>
              <th>Leave ID</th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration (Days)</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.leave_id}</td>
                <td>{request.employee_id}</td>
                <td>{request.employee ? request.employee.first_name : "N/A"}</td>
                <td>{request.leave_type}</td>
                <td>{request.start_date}</td>
                <td>{request.end_date}</td>
                <td>
                  {Math.ceil(
                    (new Date(request.end_date) - new Date(request.start_date)) / (1000 * 60 * 60 * 24)
                  )}
                </td>
                <td className={`status-${request.status.toLowerCase()}`}>
                  {request.status}
                </td>
                <td>{request.reason || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );

};

export default LeaveRequestPage;
