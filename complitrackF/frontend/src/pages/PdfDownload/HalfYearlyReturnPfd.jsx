import React, { useState, useEffect } from 'react';

const HalfYearlyReturnPDF = () => {
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState("");
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch factories that have HalfYearlyReturn records
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/half-yearly-return/factories`);
        const data = await response.json();
        setFactories(data);
      } catch (err) {
        console.error("Failed to fetch employers:", err);
      }
    };
    
    fetchFactories();
  }, []);
  
  // Fetch reporting periods when a factory is selected
  useEffect(() => {
    if (!selectedFactory) return;
    
    console.log(factories)
    const fetchPeriods = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/half-yearly-return/periods/${selectedFactory}`
        );
        const data = await response.json();
        setPeriods(data);
      } catch (err) {
        console.error("Failed to fetch reporting periods:", err);
      }
    };

    fetchPeriods();
  }, [selectedFactory]);


  // Generate PDF
  const generatePDF = async () => {
    if (!selectedFactory || !selectedPeriod) {
      alert("Please select a factory and reporting period first.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/half-yearly-return/generate-pdf/${selectedFactory}/${selectedPeriod}`
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Generate Half Yearly Return Report</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Select Factory: </label>
        <select
          value={selectedFactory}
          onChange={(e) => {
            setSelectedFactory(e.target.value);
            setSelectedPeriod("");
            setPdfUrl(null);
          }}
          style={{ padding: "8px", minWidth: "300px" }}
        >
          <option value="">-- Select Factory --</option>
          {factories.map((factory) => (
            <option key={factory.latest_id} value={factory.name}>
              {factory.name}
            </option>
          ))}
        </select>
      </div>

      {selectedFactory && (
        <div style={{ marginBottom: "1rem" }}>
          <label>Select Reporting Period: </label>
          <select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value);
              setPdfUrl(null);
            }}
            style={{ padding: "8px", minWidth: "300px" }}
          >
            <option value="">-- Select Period --</option>
            {periods.map((period, index) => (
              <option key={index} value={period}>
                {formatDate(period)}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedFactory && selectedPeriod && (
        <div style={{ marginBottom: "1rem" }}>
          <button 
            onClick={generatePDF}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Generate PDF
          </button>
        </div>
      )}

      {pdfUrl && (
        <div style={{ marginTop: "30px" }}>
          <h3>PDF Preview</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            style={{ border: "1px solid #ddd", borderRadius: "4px" }}
            title="Half Yearly Return PDF Report"
          ></iframe>
          <div style={{ marginTop: "10px" }}>
            <a
              href={pdfUrl}
              download={`half-yearly-return_${selectedFactory}_${selectedPeriod}.pdf`}
              style={{
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px"
              }}
            >
              Download PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HalfYearlyReturnPDF;