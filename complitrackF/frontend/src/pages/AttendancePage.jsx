import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [file, setFile] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetching attendance data from backend when component mounts
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = () => {
    axios.get(`${API_BASE_URL}/attendance`)
      .then(response => setAttendanceData(response.data))
      .catch(error => console.error("Error fetching attendance data:", error));
  };

  // Handling file change event
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handling file upload to backend
  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios.post(`${API_BASE_URL}/attendance/upload`, formData)
      .then(response => {
        alert("File uploaded successfully!");
        fetchAttendanceData();  // Refresh data dynamically
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
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleFileUpload} className="upload-btn">Upload File</button>
      </div>
      <h2>Attendance Records</h2>

      {/* Attendance Table */}
      <div className="table-container">
        <table className="table-data">
          <thead>
            <tr>
              <th>Attendance ID</th>
              <th>Employee ID</th>
              <th>Month-Year</th>
              {[...Array(31).keys()].map(i => <th key={i}>Day {i + 1}</th>)}
              <th>Total Mandays Worked</th>
              <th>Casual Leave</th>
              <th>Sick Leave</th>
              <th>Privilege Leave</th>
              <th>Leave With Pay</th>
              <th>Leave Without Pay</th>
              <th>Any Other Reason</th>
              <th>Strike</th>
              <th>Layoff</th>
              <th>Lockout</th>
              <th>Total of 14 to 19</th>
              <th>Festival & National Holidays</th>
              <th>Weekly Holidays (Paid)</th>
              <th>Total Mandays Paid For</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td>{record.attendance_id}</td>
                <td>{record.employee_id}</td>
                <td>{record.month_year}</td>
                {[...Array(31).keys()].map(i => (
                  <td key={i} style={{ color: record[`day_${i + 1}`] === "P" ? "black" : "red", textAlign: "center" }}>
                    {record[`day_${i + 1}`] || "-"}
                  </td>
                ))}
                <td>{record.total_mandays_worked}</td>
                <td>{record.casual_leave}</td>
                <td>{record.sick_leave}</td>
                <td>{record.privilege_leave}</td>
                <td>{record.leave_with_pay}</td>
                <td>{record.leave_without_pay}</td>
                <td>{record.any_other_reason}</td>
                <td>{record.strike}</td>
                <td>{record.layoff}</td>
                <td>{record.lockout}</td>
                <td>{record.total_14_to_19}</td>
                <td>{record.number_festival_national_holidays}</td>
                <td>{record.number_weekly_holidays_off_paid}</td>
                <td>{record.total_mandays_paid_for}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
