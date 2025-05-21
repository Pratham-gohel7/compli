import React, { useState, useEffect } from "react";
import axios from "axios";

const OverTimePage = () => {
    const [file, setFile] = useState(null);
    const [month, setMonth] = useState(""); // Store selected month
    const [overtimeData, setOvertimeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle month selection
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    // Upload file with month
    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file");
            return;
        }
        if (!month) {
            setError("Please select a month");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("month", month); // Send month to backend

        try {
            setLoading(true);
            setError("");
            await axios.post(`${API_BASE_URL}/overtime/upload-overtime`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("File uploaded successfully!");
            fetchOvertimeData();
        } catch (err) {
            console.error("Error uploading file:", err);
            setError("Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    // Fetch overtime data from backend
    const fetchOvertimeData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/overtime`);
            setOvertimeData(response.data);
        } catch (err) {
            console.error("Error fetching overtime data:", err);
            setError("Error fetching data");
        }
    };

    // Load overtime data on mount
    useEffect(() => {
        fetchOvertimeData();
    }, []);

    return (
        <div className="display-container">

            {/* File Upload & Month Selection */}
            <div className="upload-section">

                <input type="month" value={month} onChange={handleMonthChange} className="file-input" />

                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="file-input" />

                <button onClick={handleUpload} disabled={loading} className="submit-btn">
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="error">{error}</p>}

            <h2 className="title">OverTime Data Upload & View</h2>
            {/* Display Overtime Data */}

            <div className="table-container">
                <table className="table-data">
                    <thead>
                        <tr>
                            <th>Company ID</th>
                            <th>Employee ID</th>
                            <th>Month</th>
                            <th>Date</th>
                            <th>Daily Hours</th>
                            <th>Weekly Hours</th>
                            <th>Overtime Hours</th>
                            <th>Total Overtime Hours</th>
                            <th>Normal Rate Per Hour</th>
                            <th>Overtime Rate Per Hour</th>
                            <th>Normal Rate Per Piece</th>
                            <th>Overtime Rate Per Piece</th>
                            <th>Normal Earning</th>
                            <th>Overtime Earning</th>
                            <th>Total Earning</th>
                            <th>Overtime Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {overtimeData.length > 0 ? (
                            overtimeData.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.company_id}</td>
                                    <td>{record.employee_id}</td>
                                    <td>{record.month}</td>
                                    <td>{record.date}</td>
                                    <td>{record.daily_hours}</td>
                                    <td>{record.weekly_hours}</td>
                                    <td>{record.overtime_hours}</td>
                                    <td>{record.total_overtime_hours}</td>
                                    <td>{record.normal_rate_per_hour}</td>
                                    <td>{record.overtime_rate_per_hour}</td>
                                    <td>{record.normal_rate_per_piece}</td>
                                    <td>{record.overtime_rate_per_piece}</td>
                                    <td>{record.normal_earning}</td>
                                    <td>{record.overtime_earning}</td>
                                    <td>{record.total_earning}</td>
                                    <td>{record.overtime_pay_date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="16">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OverTimePage;
