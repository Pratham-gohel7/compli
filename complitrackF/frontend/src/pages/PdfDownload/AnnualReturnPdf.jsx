// // import React, { useState, useContext } from "react";
// // import { FormContext } from "../context/FormContext.jsx";

// // const AnnualReturnpdf = () => {
// //     const { selectedCompanyId, selectedYear } = useContext(FormContext);
// //     const [pdfUrl, setPdfUrl] = useState(null);

// //     const generatePDF = async () => {
// //         if (!selectedCompanyId || !selectedYear) {
// //             alert("Please select a company and year first.");
// //             return;
// //         }

// //         const response = await fetch(`http://localhost:5001/api/annualreturn/generate-pdf/${selectedCompanyId}/${selectedYear}`);
// //         const data = await response.json();

// //         if (data.pdfUrl) {
// //             setPdfUrl(`http://localhost:5001${data.pdfUrl}`);
// //         } else {
// //             alert("Failed to generate PDF.");
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Annual Return Report</h1>
// //             <button onClick={generatePDF}>Generate PDF</button>

// //             {pdfUrl && (
// //                 <iframe
// //                     src={pdfUrl}
// //                     width="100%"
// //                     height="600px"
// //                     style={{ border: "none" }}
// //                 ></iframe>
// //             )}
// //         </div>
// //     );
// // };

// // export default AnnualReturnpdf;


// import React, { useState, useContext, useEffect } from "react";
// import { FormContext } from "../context/FormContext.jsx";
// import CompanySelector from "./CompanySelector.jsx";


// const AnnualReturnpdf = () => {
//     const {
//         selectedCompanyId,
//         setSelectedCompanyId,
//         selectedYear,
//         setSelectedYear,
//     } = useContext(FormContext);

//     const [companies, setCompanies] = useState([]);
//     const [years, setYears] = useState([]);
//     const [pdfUrl, setPdfUrl] = useState(null);

//     // 🔁 Fetch companies on mount
//     // useEffect(() => {
//     //     const fetchCompanies = async () => {
//     //         try {
//     //             const res = await fetch("http://localhost:5001/api/companies");
//     //             const data = await res.json();
//     //             setCompanies(data);
//     //         } catch (err) {
//     //             console.error("Failed to fetch companies:", err);
//     //         }
//     //     };

//     //     fetchCompanies();
//     // }, []);

//     useEffect(() => {
//         const fetchCompanies = async () => {
//             try {
//                 const response = await fetch("http://localhost:5001/api/annualreturn/with-annual-report");
//                 const data = await response.json();
//                 console.log("Fetched companies:", data);
//                 setCompanies(data); // assuming setCompanies is your state setter                
//             } catch (error) {
//                 console.error("Failed to fetch companies:", err);
//             }
//         };
    
//         fetchCompanies();
//     }, []);
    

//     const generatePDF = async () => {
//         if (!selectedCompanyId) {
//             alert("Please select a company and year first.");
//             return;
//         }

//         try {
//             const res = await fetch(`http://localhost:5001/api/annualreturn/generate-pdf/${selectedCompanyId}/${selectedYear}`);
//             const data = await res.json();

//             if (data?.pdfUrl) {
//                 setPdfUrl(`http://localhost:5001${data.pdfUrl}`);
//             } else {
//                 setPdfUrl(null);
//                 alert("No data found for selected company and year.");
//             }
//         } catch (error) {
//             console.error("Error generating PDF:", error);
//             alert("Failed to generate PDF. Try again later.");
//         }
//     };

//     return (
//         <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//             <h1>Annual Return Report</h1>

//             <div style={{ marginBottom: "1rem" }}>
//                 <label>Select Company: </label>
//                 <select
//                     value={selectedCompanyId}
//                     onChange={(e) => setSelectedCompanyId(e.target.value)}
//                 >
//                     <option value="">-- Select Company --</option>
//                     {Array.isArray(companies) && companies.map((company) => (
//     <option key={company.company_id} value={company.company_id}>
//         {company.company_name}
//     </option>
// ))}
//                 </select>
//                 {/* <CompanySelector/> */}
//             </div>
// {/* 
//             <div style={{ marginBottom: "1rem" }}>
//                 <label>Select Year: </label>
//                 <select
//                     value={selectedYear || ""}
//                     onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                     <option value="">-- Select Year --</option>
//                     {[2020, 2021, 2022, 2023, 2024].map((year) => (
//                         <option key={year} value={year}>
//                             {year}
//                         </option>
//                     ))}
//                 </select>
//             </div> */}

// <div className="form-group">
//             <label>Select Year:</label>
//             <select
//                 value={setSelectedYear || ""}  // ✅ Ensures empty selection initially
//                 onChange={(e) => setSelectedYear(e.target.value)}
//             >
//                 <option value="" disabled>-- Select a Year --</option> {/* ✅ Forces selection */}
//                 {Array.from({ length: 100 }, (_, i) => {
//                     const year = new Date().getFullYear() - i;
//                     return <option key={year} value={year}>{year}</option>;
//                 })}
//             </select>
//         </div>

//             <button onClick={generatePDF}>Generate PDF</button>

//             {pdfUrl && (
//                 <div style={{ marginTop: "20px" }}>
//                     <iframe
//                         src={pdfUrl}
//                         width="100%"
//                         height="600px"
//                         style={{ border: "none" }}
//                         title="PDF Preview"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AnnualReturnpdf;


import React, { useEffect, useState } from "react";

const AnnualReturnViewer = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [annualData, setAnnualData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    // Fetch companies that have annual return records
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/annualreturn/with-annual-report");
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
                const response = await fetch(`http://localhost:5001/api/annualreturn/years/${selectedCompanyId}`);
                const data = await response.json();
                setYears(data);
            } catch (err) {
                console.error("Failed to fetch years:", err);
            }
        };

        fetchYears();
    }, [selectedCompanyId]);

    // Fetch annual return data when both company and year are selected
    const fetchAnnualData = async () => {
        if (!selectedCompanyId || !selectedYear) {
            alert("Please select both a company and year.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/annualreturn/data/${selectedCompanyId}/${selectedYear}`);
            const data = await response.json();

            if (response.ok) {
                setAnnualData(data);
            } else {
                alert(data.message || "No data found.");
                setAnnualData(null);
            }
        } catch (err) {
            console.error("Failed to fetch annual return data:", err);
        }
    };

    // Generate PDF
    const generatePDF = async () => {
        if (!selectedCompanyId || !selectedYear) {
            alert("Please select a company and year first.");
            return;
        }

        try {
            console.log(selectedCompanyId);
            console.log(selectedYear);
            const response = await fetch(`http://localhost:5001/api/annualreturn/generate-pdf/${selectedCompanyId}/${selectedYear}`);
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
            <h1>Generate Annual Return Report</h1>

            <div style={{ marginBottom: "1rem" }}>
                <label>Select Company: </label>
                <select
                    value={selectedCompanyId}
                    onChange={(e) => {
                        setSelectedCompanyId(e.target.value);
                        setSelectedYear("");
                        setAnnualData(null);
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
                            setAnnualData(null);
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
                    <button onClick={fetchAnnualData} style={{ marginRight: "10px" }}>
                        View Data
                    </button>
                    <button onClick={generatePDF}>Generate PDF</button>
                </div>
            )}

            {annualData && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Annual Return Data</h3>
                    <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
                        {JSON.stringify(annualData, null, 2)}
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
                        title="Annual Report PDF"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default AnnualReturnViewer;
