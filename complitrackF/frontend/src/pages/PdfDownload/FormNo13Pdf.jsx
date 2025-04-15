import React, { useState, useEffect } from "react";
import axios from "axios";

const FormNo13Pdf = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedMonthYear, setSelectedMonthYear] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch companies on component mount
    useEffect(() => {
        axios.get("http://localhost:5001/api/companies")
            .then(response => setCompanies(response.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    // Generate and Display PDF
    const generatePDF = async () => {
        if (!selectedCompany || !selectedMonthYear) {
            alert("Please select both Company and Month-Year.");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:5001/api/overtime/generate-pdf?company_id=${selectedCompany}&month_year=${selectedMonthYear}`
            );

            if (response.data.pdfUrl) {
                setPdfUrl(`http://localhost:5001${response.data.pdfUrl}`);
            } else {
                alert("Error generating PDF");
            }
        } catch (error) {
            console.error("❌ Error generating PDF:", error);
            alert("Error generating PDF");
        }
        finally {
            setTimeout(() => setLoading(false), 1000); // ✅ Simulate loading delay for better UI
        }
    };


    return (
        <div className="form-container">
            <center>
                <h4>Generate Employee OverTime Form 13</h4>

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


                {/* Month-Year Picker */}
                <label>Select Month-Year:</label>
                <input
                    type="month"
                    value={selectedMonthYear}
                    onChange={(e) => setSelectedMonthYear(e.target.value)}
                    style={{ width: "150px" }}
                />
                {/* Generate PDF Button */}
                <button onClick={generatePDF} className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
                    {loading ? "Generating..." : "Generate PDF"}
                </button>
            </div>

            <br /><br />


            {/* Show PDF Preview */}
            {pdfUrl && (
                <div>
                    <iframe src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=0`} width="100%" height="500px" ></iframe>

                </div>
            )}
        </div>
    );
};

export default FormNo13Pdf;
