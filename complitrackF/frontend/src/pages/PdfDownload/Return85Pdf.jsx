// import React, { useEffect, useState } from "react";

// const Return85Pdf = () => {
//     const [employers, setEmployers] = useState([]);
//     const [selectedEmployerId, setSelectedEmployerId] = useState("");
//     const [periods, setPeriods] = useState([]);
//     const [selectedPeriod, setSelectedPeriod] = useState("");
//     const [returnData, setReturnData] = useState(null);
//     const [pdfUrl, setPdfUrl] = useState(null);

//     // Fetch employers that have Return85 records
//     useEffect(() => {
//         const fetchEmployers = async () => {
//             try {
//                 const response = await fetch("http://localhost:5001/api/returns/employers");
//                 const data = await response.json();
//                 setEmployers(data);
//             } catch (err) {
//                 console.error("Failed to fetch employers:", err);
//             }
//         };

//         fetchEmployers();
//     }, []);

//     // Fetch reporting periods when an employer is selected
//     useEffect(() => {
//         if (!selectedEmployerId) return;

//         const fetchPeriods = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/returns/periods/${selectedEmployerId}`);
//                 const data = await response.json();
//                 setPeriods(data);
//             } catch (err) {
//                 console.error("Failed to fetch reporting periods:", err);
//             }
//         };

//         fetchPeriods();
//     }, [selectedEmployerId]);

//     // Fetch Return85 data when both employer and period are selected
//     const fetchReturnData = async () => {
//         if (!selectedEmployerId || !selectedPeriod) {
//             alert("Please select both an employer and reporting period.");
//             return;
//         }

//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/returns/data/${selectedEmployerId}/${selectedPeriod}`
//             );
//             const data = await response.json();

//             if (response.ok) {
//                 setReturnData(data);
//             } else {
//                 alert(data.message || "No data found.");
//                 setReturnData(null);
//             }
//         } catch (err) {
//             console.error("Failed to fetch return data:", err);
//         }
//     };

//     // Generate PDF
//     const generatePDF = async () => {
//         if (!selectedEmployerId || !selectedPeriod) {
//             alert("Please select an employer and reporting period first.");
//             return;
//         }

//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/returns/generate-pdf/${selectedEmployerId}/${selectedPeriod}`
//             );
//             const data = await response.json();

//             if (data.pdfUrl) {
//                 setPdfUrl(`http://localhost:3000${data.pdfUrl}`);
//             } else {
//                 alert(data.message || "Failed to generate PDF.");
//             }
//         } catch (error) {
//             console.error("Error generating PDF:", error);
//             alert("Error generating PDF.");
//         }
//     };

//     return (
//         <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//             <h1>Return85 Report Viewer</h1>

//             <div style={{ marginBottom: "1rem" }}>
//                 <label>Select Employer: </label>
//                 <select
//                     value={selectedEmployerId}
//                     onChange={(e) => {
//                         setSelectedEmployerId(e.target.value);
//                         setSelectedPeriod("");
//                         setReturnData(null);
//                         setPdfUrl(null);
//                     }}
//                 >
//                     <option value="">-- Select Employer --</option>
//                     {employers.map((employer) => (
//                         <option key={employer.id} value={employer.id}>
//                             {employer.employer_name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {selectedEmployerId && (
//                 <div style={{ marginBottom: "1rem" }}>
//                     <label>Select Reporting Period: </label>
//                     <select
//                         value={selectedPeriod}
//                         onChange={(e) => {
//                             setSelectedPeriod(e.target.value);
//                             setReturnData(null);
//                             setPdfUrl(null);
//                         }}
//                     >
//                         <option value="">-- Select Period --</option>
//                         {periods.map((period) => (
//                             <option key={period} value={period}>
//                                 {new Date(period).toLocaleDateString('en-US', {
//                                     year: 'numeric',
//                                     month: 'long'
//                                 })}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             )}

//             {selectedEmployerId && selectedPeriod && (
//                 <div style={{ marginBottom: "1rem" }}>
//                     <button onClick={fetchReturnData} style={{ marginRight: "10px" }}>
//                         View Data
//                     </button>
//                     <button onClick={generatePDF}>Generate PDF</button>
//                 </div>
//             )}

//             {returnData && (
//                 <div style={{ marginTop: "20px" }}>
//                     <h3>Return85 Data</h3>
//                     <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
//                         {JSON.stringify(returnData, null, 2)}
//                     </pre>
//                 </div>
//             )}

//             {pdfUrl && (
//                 <div style={{ marginTop: "30px" }}>
//                     <h3>PDF Preview</h3>
//                     <iframe
//                         src={pdfUrl}
//                         width="100%"
//                         height="600px"
//                         style={{ border: "none" }}
//                         title="Return85 PDF Report"
//                     ></iframe>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Return85Pdf;



import React, { useEffect, useState } from "react";

const Return85Pdf = () => {
    const [employers, setEmployers] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState(""); // Now using employer name
    const [periods, setPeriods] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [returnData, setReturnData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    // Fetch employers that have Return85 records
    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/returns/employers");
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
                const response = await fetch(`http://localhost:5001/api/returns/periods/${selectedEmployer}`);
                const data = await response.json();
                setPeriods(data);
            } catch (err) {
                console.error("Failed to fetch reporting periods:", err);
            }
        };

        fetchPeriods();
    }, [selectedEmployer]);

    // Fetch Return85 data when both employer and period are selected
    const fetchReturnData = async () => {
        if (!selectedEmployer || !selectedPeriod) {
            alert("Please select both an employer and reporting period.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5001/api/returns/data/${selectedEmployer}/${selectedPeriod}`
            );
            const data = await response.json();

            if (response.ok) {
                setReturnData(data);
            } else {
                alert(data.message || "No data found.");
                setReturnData(null);
            }
        } catch (err) {
            console.error("Failed to fetch return data:", err);
        }
    };

    // Generate PDF
    const generatePDF = async () => {
        if (!selectedEmployer || !selectedPeriod) {
            alert("Please select an employer and reporting period first.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5001/api/returns/generate-pdf/${selectedEmployer}/${selectedPeriod}`
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
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h2>Generate 85% Local Employment Form</h2>

            <div style={{ marginBottom: "1rem" }}>
                <label>Select Employer: </label>
                <select
                    value={selectedEmployer}
                    onChange={(e) => {
                        setSelectedEmployer(e.target.value);
                        setSelectedPeriod("");
                        setReturnData(null);
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
                            setReturnData(null);
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
                    <button onClick={fetchReturnData} style={{ 
                    marginRight: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer" }}>
                        View Data
                    </button>
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

            {returnData && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Return85 Data</h3>
                    <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
                        {JSON.stringify(returnData, null, 2)}
                    </pre>
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
