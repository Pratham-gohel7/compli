import React, { useState, useEffect } from "react";
import axios from "axios";

const FormNo15Pdf = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5001/api/companies")
      .then(response => {
        setCompanies(response.data);
        console.log("✅ Companies fetched:", response.data);
      })
      .catch(error => console.error("❌ Error fetching companies:", error));
  }, []);





  // const downloadPDF = async () => {
  //   if (!selectedCompanyId) {
  //     alert("Please select a company before downloading");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const response = await fetch("http://localhost:5001/api/generate-pdf", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ company_id: selectedCompanyId })
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to download PDF");
  //     }

  //     // Create a blob from the response
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);

  //     // Create a temporary <a> element to trigger the download
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `FormNo15_${selectedCompanyId}.pdf`;
  //     document.body.appendChild(a);
  //     a.click();

  //     // Cleanup
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading PDF:", error);
  //   }
  //   finally {
  //     setTimeout(() => setLoading(false), 1000); // ✅ Simulate loading delay for better UI
  //   }
  // };


  const downloadPDF = async () => {
    if (!selectedCompanyId) {
      alert("Please select a company before generating the PDF");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/generate-pdf", {
        company_id: selectedCompanyId
      });

      if (response.data.pdfUrl) {
        setPdfUrl(`http://localhost:5001${response.data.pdfUrl}`); // ✅ Set URL for frontend preview
      } else {
        alert("Error generating PDF");
      }
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
      alert("Error generating PDF");
    } finally {
      setTimeout(() => setLoading(false), 1000); // ✅ Simulate loading delay
    }
  };




  return (
    <div className="form-container">
      <center>

        <h4>Form 15 </h4>
      </center>
      <div className="upload-section">
        <label>Select Company:</label>
        <select name="company" value={selectedCompanyId || ""} onChange={(e) => setSelectedCompanyId(e.target.value)}>
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>


        <button onClick={downloadPDF} className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
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

export default FormNo15Pdf;
