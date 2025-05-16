import React, { useState, useEffect } from "react";
import axios from "axios";

const FormNo12Pdf = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [pdfUrl, setPdfUrl] = useState("");
    // const [pdfUrl, setPdfUrl] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        axios.get("http://localhost:5001/api/companies")
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    const generatePDF = async () => {
        if (!selectedCompanyId) {
            alert("Please select a company before generating the PDF");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5001/api/generate-form12-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ company_id: selectedCompanyId })
            });

            if (!response.ok) throw new Error("Failed to generate PDF");

            // Convert response to Blob (binary data)
            const pdfBlob = await response.blob();
            const pdfObjectURL = URL.createObjectURL(pdfBlob); // Create URL for preview

            setPdfUrl(pdfObjectURL); // Store for displaying the PDF
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
        finally {
            setTimeout(() => setLoading(false), 1000); // ✅ Simulate loading delay for better UI
        }
    };

    const downloadPDF = () => {
        if (!pdfUrl) return;

        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = `FormXII_${selectedCompanyId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="form-container">
            <center>

                <h4>Form No. 12 - Generate Contractor Details</h4>
            </center>


            {/* Dropdown to Select Company */}
            <div className="upload-section">
                <select value={selectedCompanyId || ""} onChange={(e) => setSelectedCompanyId(e.target.value)}>
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
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

export default FormNo12Pdf;
