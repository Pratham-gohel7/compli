// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FormNo15Pdf = () => {
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompanyId, setSelectedCompanyId] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     axios.get(`${API_BASE_URL}/companies`)
//       .then(response => {
//         setCompanies(response.data);
//         console.log("✅ Companies fetched:", response.data);
//       })
//       .catch(error => console.error("❌ Error fetching companies:", error));
//   }, []);


//   // const downloadPDF = async () => {
//   //   if (!selectedCompanyId) {
//   //     alert("Please select a company before generating the PDF");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const response = await axios.post(`${API_BASE_URL}/generate-pdf`, {
//   //       company_id: selectedCompanyId
//   //     });

//   //     if (response.data.pdfUrl) {
//   //       setPdfUrl(`${API_BASE_URL}${data.pdfUrl}`); // ✅ Set URL for frontend preview
//   //     } else {
//   //       alert("Error generating PDF");
//   //     }
//   //   } catch (error) {
//   //     console.error("❌ Error generating PDF Or Data Does not exists", error);
//   //     alert("Data Does not exists");
//   //   } finally {
//   //     setTimeout(() => setLoading(false), 1000); // ✅ Simulate loading delay
//   //   }
//   // };

//   const downloadPDF = async () => {
//     if (!selectedCompanyId) {
//         alert("Please select a company before generating the PDF");
//         return;
//     }

//     setLoading(true);

//     try {
//         const response = await axios.post(`${API_BASE_URL}/generate-pdf`, {
//             company_id: selectedCompanyId
//         }, {
//             responseType: 'blob' // Important for handling PDF response
//         });

//         // Create a blob URL for the PDF
//         const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(pdfBlob);
//         setPdfUrl(pdfUrl);

//         // Optionally auto-download the PDF
//         const link = document.createElement('a');
//         link.href = pdfUrl;
//         link.download = `form15_${selectedCompanyId}.pdf`;
//         link.click();

//     } catch (error) {
//         console.error("❌ Error generating PDF:", error);
//         alert(error.response?.data?.message || "Error generating PDF");
//     } finally {
//         setLoading(false);
//     }
// };


// const generateForm15PDF = async () => {
//     if (!selectedCompanyId) {
//         alert("Please select a company first");
//         return;
//     }

//     setLoading(true);

//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/generate-form15-pdf`,
//             { company_id: selectedCompanyId }
//         );

//         if (response.data.pdfUrl) {
//             setPdfUrl(`${API_BASE_URL}${response.data.pdfUrl}`); // 🔁 iframe-friendly
//         } else {
//             alert("Error generating PDF");
//         }
//     } catch (error) {
//         console.error("Error generating Form 15 PDF:", error);
//         alert("Failed to generate PDF");
//     } finally {
//         setTimeout(() => setLoading(false), 1000);
//     }
// };


// // const generateForm15PDF = async () => {
// //     if (!selectedCompanyId) {
// //         alert("Please select a company first");
// //         return;
// //     }

// //     setLoading(true);

// //     try {
// //         const response = await axios.post(
// //             `${API_BASE_URL}/generate-form15-pdf`,
// //             { company_id: selectedCompanyId },
// //             //{ responseType: 'blob' } // Important for PDF response
// //         );

// //         // Create PDF blob URL
// //         // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
// //         // const pdfUrl = URL.createObjectURL(pdfBlob);
// //         // setPdfUrl(pdfUrl);

// //         if (response.data.pdfUrl) {
// //           setPdfUrl(`${API_BASE_URL}/api/${response.data.pdfUrl}`); // for iframe
// //         }

// //         // Auto-download the PDF
// //         // const link = document.createElement('a');
// //         // link.href = pdfUrl;
// //         // link.download = `Form15_${selectedCompanyId}_${new Date().toISOString().split('T')[0]}.pdf`;
// //         // document.body.appendChild(link);
// //         // link.click();
// //         // document.body.removeChild(link);

// //     } catch (error) {
// //         console.error("Error generating Form 15 PDF:", error);
// //         alert(error.response?.data?.error || "Failed to generate PDF");
// //     } finally {
// //         setLoading(false);
// //     }
// // };

//   return (
//     <div className="form-container">
//       <center>

//         <h4>Form 15 - Generate Adult worker Details </h4>
//       </center>
//       <div className="upload-section">
//         <label>Select Company:</label>
//         <select name="company" value={selectedCompanyId || ""} onChange={(e) => setSelectedCompanyId(e.target.value)}>
//           <option value="">Select Company</option>
//           {companies.map((company) => (
//             <option key={company.company_id} value={company.company_id}>
//               {company.company_name}
//             </option>
//           ))}
//         </select>


//         <button onClick={downloadPDF} className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
//           {loading ? "Generating..." : "Generate PDF"}
//         </button>
//       </div>

//       <br /><br />


//       {/* Show PDF Preview */}
//       {pdfUrl && (
//         // <div>
//         //   <iframe src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=0`} width="100%" height="500px" ></iframe>

//         // </div>

//         // <iframe src={pdfUrl} width="100%" height="600px" title="PDF Preview" />
//         <iframe src={`${API_BASE_URL}${pdfUrl}#toolbar=0`} width="100%" height="600px" />


//       )}
//     </div>
//   );
// };

// export default FormNo15Pdf;



import React, { useState, useEffect } from "react";
import axios from "axios";

const FormNo15Pdf = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // useEffect(() => {
  //   axios.get(`${API_BASE_URL}/companies`)
  //     .then(response => setCompanies(response.data))
  //     .catch(error => console.error("Error fetching companies:", error));
  // }, []);

  useEffect(() => {
    const fetchCompaniesWithForms = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/formno15/companies`);
            setCompanies(response.data.data);
        } catch (error) {
            console.error("Error fetching companies:", error);
            // Optional: show toast notification
        }
    };
    
    fetchCompaniesWithForms();
}, []);

  const generateForm15PDF = async () => {
    if (!selectedCompanyId) {
      alert("Please select a company first");
      return;
    }

    setLoading(true);
    setPdfUrl(""); // Reset previous PDF

    try {
      const response = await axios.post(
        `${API_BASE_URL}/generate-form15-pdf`,
        { company_id: selectedCompanyId }
      );

      if (response.data.pdfUrl) {
        // Construct proper URL - remove any duplicate /api in the path
        const cleanUrl = response.data.pdfUrl.startsWith('/') 
          ? response.data.pdfUrl 
          : `/${response.data.pdfUrl}`;
        setPdfUrl(`${API_BASE_URL}${cleanUrl}`);
      } else {
        alert("PDF generation failed - no URL returned");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(error.response?.data?.message || "Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <center>
        <h4>Form 15 - Generate Adult worker Details</h4>
      </center>
      
      <div className="upload-section">
        <label>Select Company:</label>
        <select 
            value={selectedCompanyId || ""}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
        >
            <option value="">Select Company</option>
            {companies.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                </option>
            ))}
        </select>

        {/* <button 
          onClick={generateForm15PDF} 
          disabled={loading || !selectedCompanyId}
        >
          {loading ? "Generating..." : "Generate PDF"}
        </button> */}

        <button onClick={generateForm15PDF} className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
           {loading ? "Generating..." : "Generate PDF"}
         </button>
      </div>

      {pdfUrl && (
        <div style={{ marginTop: '20px' }}>
          <iframe 
            src={`${pdfUrl}#toolbar=1&navpanes=1`} 
            width="100%" 
            height="600px"
            title="PDF Preview"
            style={{ border: '1px solid #ccc' }}
          />
          <div style={{ marginTop: '10px' }}>
            <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormNo15Pdf;