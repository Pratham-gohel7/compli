import React, { useEffect, useState } from "react";

const FormCNVPdf = () => {
    const [employers, setEmployers] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState("");
    const [submissionDates, setSubmissionDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [pdfUrl, setPdfUrl] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch employers that have CNV form submissions
    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/form-cnv/employers`);
                const data = await response.json();
                setEmployers(data);
            } catch (err) {
                console.error("Failed to fetch employers:", err);
            }
        };

        fetchEmployers();
    }, []);

    // Fetch submission dates when an employer is selected
    useEffect(() => {
        if (!selectedEmployer) return;

        const fetchSubmissionDates = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/form-cnv/dates/${selectedEmployer}`);
                const data = await response.json();
                setSubmissionDates(data);
            } catch (err) {
                console.error("Failed to fetch submission dates:", err);
            }
        };

        fetchSubmissionDates();
    }, [selectedEmployer]);


    // Generate PDF
    const generatePDF = async () => {
        if (!selectedEmployer || !selectedDate) {
            alert("Please select an employer and submission date first.");
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/form-cnv/generate-pdf/${selectedEmployer}/${selectedDate}`
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
        <div className="p-5 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Generate CNV Form</h2>

            <div className="mb-4">
                <label className="block font-medium mb-2">Select Employer:</label>
                <select
                    className="w-full p-2 border rounded"
                    value={selectedEmployer}
                    onChange={(e) => {
                        setSelectedEmployer(e.target.value);
                        setSelectedDate("");
                        setPdfUrl(null);
                    }}
                >
                    <option value="">-- Select Employer --</option>
                    {employers.length === 0 && (
                        <option value="">No employers found</option>
                        )}
                    {employers.map((employerName, index) => (
                        <option key={index} value={employerName}>
                            {employerName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedEmployer && (
                <div className="mb-4">
                    <label className="block font-medium mb-2">Select Submission Date:</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setPdfUrl(null);
                        }}
                    >
                        <option value="">-- Select Date --</option>
                        {submissionDates.map((date) => (
                            <option key={date} value={date}>
                                {new Date(date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedEmployer && selectedDate && (
                <div style={{ marginBottom: "1rem" }}>
                    <button onClick={generatePDF} style={{                    
                    padding: "8px 16px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"}}>Generate PDF</button>
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
                        title="CNV PDF Report"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default FormCNVPdf;