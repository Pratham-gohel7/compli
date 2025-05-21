import React, { useEffect, useState } from "react";

const AnnualReturnViewer = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [pdfUrl, setPdfUrl] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch companies that have annual return records
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/annualreturn/with-annual-report`);
                const data = await response.json();
                setCompanies(data);
            } catch (err) {
                console.error("Failed to fetch companies:", err);
            }
        };

        fetchCompanies();
    }, []);

    // Fetch years when a company is selected
    useEffect(() => {
        if (!selectedCompanyId) return;

        const fetchYears = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/annualreturn/years/${selectedCompanyId}`);
                const data = await response.json();
                setYears(data);
            } catch (err) {
                console.error("Failed to fetch years:", err);
            }
        };

        fetchYears();
    }, [selectedCompanyId]);

    // Generate PDF
    const generatePDF = async () => {
        if (!selectedCompanyId || !selectedYear) {
            alert("Please select a company and year first.");
            return;
        }

        try {
            console.log(selectedCompanyId);
            console.log(selectedYear);
            const response = await fetch(`${API_BASE_URL}/annualreturn/generate-pdf/${selectedCompanyId}/${selectedYear}`);
            const data = await response.json();

            if (data.pdfUrl) {
                setPdfUrl(`${API_BASE_URL}${data.pdfUrl}`);
            } else {
                alert(data.message || "Failed to generate PDF.");
            }
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error generating PDF.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1>Generate Annual Return Report</h1>

            <div style={{ marginBottom: "1rem" }}>
                <label>Select Company: </label>
                <select
                    value={selectedCompanyId}
                    onChange={(e) => {
                        setSelectedCompanyId(e.target.value);
                        setSelectedYear("");
                        setPdfUrl(null);
                    }}
                >
                    <option value="">-- Select Company --</option>
                    {companies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCompanyId && (
                <div style={{ marginBottom: "1rem" }}>
                    <label>Select Year: </label>
                    <select
                        value={selectedYear}
                        onChange={(e) => {
                            setSelectedYear(parseInt(e.target.value));
                            setPdfUrl(null);
                        }}
                    >
                        <option value="">-- Select Year --</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedCompanyId && selectedYear && (
                <div style={{ marginBottom: "1rem" }}>
                    <button onClick={generatePDF}  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}>Generate PDF</button>
                </div>
            )}

            {pdfUrl && (
                <div style={{ marginTop: "30px" }}>
                    <h3>PDF Preview</h3>
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="600px"
                        style={{ border: "none" }}
                        title="Annual Report PDF"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default AnnualReturnViewer;
