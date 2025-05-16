import React, { useEffect, useState } from "react";

const FormCNFPdf = () => {
    const [employers, setEmployers] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState("");
    const [submissionDates, setSubmissionDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [formData, setFormData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    // Fetch employers that have CNF form submissions
    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/form-cnf/employers");
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
                const response = await fetch(`http://localhost:5001/api/form-cnf/dates/${selectedEmployer}`);
                const data = await response.json();
                setSubmissionDates(data);
            } catch (err) {
                console.error("Failed to fetch submission dates:", err);
            }
        };

        fetchSubmissionDates();
    }, [selectedEmployer]);

    // Fetch CNF form data when both employer and date are selected
    const fetchFormData = async () => {
        if (!selectedEmployer || !selectedDate) {
            alert("Please select both an employer and submission date.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5001/api/form-cnf/data/${selectedEmployer}/${selectedDate}`
            );
            const data = await response.json();

            if (response.ok) {
                setFormData(data);
            } else {
                alert(data.message || "No data found.");
                setFormData(null);
            }
        } catch (err) {
            console.error("Failed to fetch form data:", err);
        }
    };

    // Generate PDF
    const generatePDF = async () => {
        if (!selectedEmployer || !selectedDate) {
            alert("Please select an employer and submission date first.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5001/api/form-cnf/generate-pdf/${selectedEmployer}/${selectedDate}`
            );
            const data = await response.json();

            if (data.pdfUrl) {
                setPdfUrl(`http://localhost:5001${data.pdfUrl}`);
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
            <h2 className="text-2xl font-bold mb-6">Generate CNF Form</h2>

            <div className="mb-4">
                <label className="block font-medium mb-2">Select Employer:</label>
                <select
                    className="w-full p-2 border rounded"
                    value={selectedEmployer}
                    onChange={(e) => {
                        setSelectedEmployer(e.target.value);
                        setSelectedDate("");
                        setFormData(null);
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
                <div className="mb-4">
                    <label className="block font-medium mb-2">Select Submission Date:</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setFormData(null);
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
                    <button onClick={fetchFormData} style={{ marginRight: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"}}>
                        View Data
                    </button>
                    <button onClick={generatePDF} style={{                    
                    padding: "8px 16px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"}}>Generate PDF</button>
                </div>
            )}

            {formData && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">CNF Form Data</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium">Employer Information</h4>
                            <p>{formData.employer_name}</p>
                            <p className="text-gray-600">{formData.employer_address}</p>
                        </div>

                        <div>
                            <h4 className="font-medium">Vacancy Details</h4>
                            <p>Nature: {formData.vacancy_nature}</p>
                            <p>Worker Type: {formData.worker_type}</p>
                            <p>Duties: {formData.duties_description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium">Vacancies</h4>
                                <p>Regular: {formData.regular_vacancies}</p>
                                <p>Temporary: {formData.temporary_vacancies}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Timeline</h4>
                                <p>Filling Date: {new Date(formData.probable_filling_date).toLocaleDateString()}</p>
                                {formData.interview_date && (
                                    <p>Interview: {new Date(formData.interview_date).toLocaleDateString()}</p>
                                )}
                            </div>
                        </div>
                    </div>
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
                        title="CNF PDF Report"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default FormCNFPdf;