import React, { useState, useEffect } from "react";
import axios from "axios";


const FormNo28Pdf = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedMonthYear, setSelectedMonthYear] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/companies`)
            .then(response => setCompanies(response.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    const generatePDF = async () => {
        if (!selectedCompany || !selectedMonthYear) {
            alert("Please select both Company and Month-Year.");
            return;
        }

        setLoading(true); // ✅ Start loading animation

        const formattedMonthYear = selectedMonthYear.split("-").reverse().join("-");

        try {
            const response = await axios.get(
                `${API_BASE_URL}/form28/pdf?company_id=${selectedCompany}&month_year=${formattedMonthYear}`
            );

            if (response.data.pdfUrl) {
                setPdfUrl(`${API_BASE_URL}${response.data.pdfUrl}`);
            } else {
                alert("Error generating PDF");
            }
        } catch (error) {
            console.error("❌ Error generating PDF:", error);
            alert("Error generating PDF");
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <div className="form-container">
            <center>

                <h4>Form No-28 - Generate Attendance</h4>
            </center>

            <div className="upload-section">
                <label>Select Company:</label>
                <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                    <option value="">Select Company</option>
                    {companies.length > 0 ? (
                        companies.map(company => (
                            <option key={company.company_id} value={company.company_id}>
                                {company.company_name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No companies available</option>
                    )}
                </select>

                <label>Select Month-Year:</label>
                <input
                    type="month"
                    value={selectedMonthYear}
                    onChange={(e) => setSelectedMonthYear(e.target.value)}
                    style={{ width: "150px" }}
                />

                {/* ✅ Animated Button with Progress Bar */}
                <button onClick={generatePDF} className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
                    {loading ? "Generating..." : "Generate PDF"}
                </button>
            </div>

            {pdfUrl && (
                <div className="pdf-preview">

                  
                  
                    <iframe src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=0`} width="100%" height="500px" ></iframe>
               
               
                </div>
            )}
        </div>
    );
};

export default FormNo28Pdf;
