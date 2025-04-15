import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const ContractorPage = () => {
    const [file, setFile] = useState(null);
    const [contractors, setContractors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Upload file to backend
    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setError("");
            await axios.post("http://localhost:5001/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("File uploaded successfully!");
            fetchContractors(); // Refresh data after upload
        } catch (err) {
            console.error("Error uploading file:", err);
            setError("Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    // Fetch contractors from backend
    const fetchContractors = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/");
            setContractors(response.data);
        } catch (err) {
            console.error("Error fetching contractors:", err);
            setError("Error fetching data");
        }
    };

    // Load contractors on mount
    useEffect(() => {
        fetchContractors();
    }, []);

    return (
        <div className="display-container">

            {/* File Upload Section */}
            <div className="upload-section">
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="file-input" />
                <button onClick={handleUpload} disabled={loading} className="submit-btn">
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>
            {error && <p className="error">{error}</p>}

            <h2 className="title">Contractor</h2>
            {/* Error Message */}

            {/* Display Contractor Data */}
            {/* <h3>Uploaded Contractor Data</h3>*/}
            <div className="table-container">
                <table className="table-data">
                    <thead>
                        <tr>
                            <th>Contractor ID</th>
                            <th>Company ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Nature of Work</th>
                            <th>Location</th>
                            <th>Contract Start</th>
                            <th>Contract End</th>
                            <th>Male Workers</th>
                            <th>Female Workers</th>
                            <th>Total Workers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contractors.length > 0 ? (
                            contractors.map((contractor, index) => (
                                <tr key={index}>
                                    <td>{contractor.contractor_id}</td>
                                    <td>{contractor.company_id}</td>
                                    <td>{contractor.contractor_name}</td>
                                    <td>{contractor.contractor_address}</td>
                                    <td>{contractor.nature_of_work}</td>
                                    <td>{contractor.location_of_work}</td>
                                    <td>{contractor.contract_start_date}</td>
                                    <td>{contractor.contract_end_date}</td>
                                    <td>{contractor.max_male_workers}</td>
                                    <td>{contractor.max_female_workers}</td>
                                    <td>{contractor.max_male_workers + contractor.max_female_workers}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContractorPage;
