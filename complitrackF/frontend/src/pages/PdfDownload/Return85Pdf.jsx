import React, { useEffect, useState } from "react";

const Return85Pdf = () => {
    const [employers, setEmployers] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState(""); // Now using employer name
    const [periods, setPeriods] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [pdfUrl, setPdfUrl] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch employers that have Return85 records
    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/returns/employers`);
                const data = await response.json();
                setEmployers(data);
            } catch (err) {
                console.error("Failed to fetch employers:", err);
            }
        };

        fetchEmployers();
    }, []);

    // Fetch reporting periods when an employer is selected
    useEffect(() => {
        if (!selectedEmployer) return;

        const fetchPeriods = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/returns/periods/${selectedEmployer}`);
                const data = await response.json();
                setPeriods(data);
            } catch (err) {
                console.error("Failed to fetch reporting periods:", err);
            }
        };

        fetchPeriods();
    }, [selectedEmployer]);

    // Generate PDF
    const generatePDF = async () => {
        if (!selectedEmployer || !selectedPeriod) {
            alert("Please select an employer and reporting period first.");
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/returns/generate-pdf/${selectedEmployer}/${selectedPeriod}`
            );
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
            <h2>Generate 85% Local Employment Form</h2>

            <div style={{ marginBottom: "1rem" }}>
                <label>Select Employer: </label>
                <select
                    value={selectedEmployer}
                    onChange={(e) => {
                        setSelectedEmployer(e.target.value);
                        setSelectedPeriod("");
                        setPdfUrl(null);
                    }}
                >
                    <option value="">-- Select Employer --</option>
                    {employers.map((employerName, index) => (
                        <option key={index} value={employerName}>
                            {employerName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedEmployer && (
                <div style={{ marginBottom: "1rem" }}>
                    <label>Select Reporting Period: </label>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => {
                            setSelectedPeriod(e.target.value);
                            setPdfUrl(null);
                        }}
                    >
                        <option value="">-- Select Period --</option>
                        {periods.map((period, index) => (
                            <option key={index} value={period}>
                                {new Date(period).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                })}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedEmployer && selectedPeriod && (
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
                        title="Return85 PDF Report"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default Return85Pdf;
