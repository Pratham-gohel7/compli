import React, { useState, useEffect } from 'react';

const HalfYearlyReturnPDF = () => {
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState("");
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [returnData, setReturnData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  // Fetch factories that have HalfYearlyReturn records
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/half-yearly-return/factories");
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
          `http://localhost:5001/api/half-yearly-return/periods/${selectedFactory}`
        );
        const data = await response.json();
        setPeriods(data);
      } catch (err) {
        console.error("Failed to fetch reporting periods:", err);
      }
    };

    fetchPeriods();
  }, [selectedFactory]);

  // Fetch HalfYearlyReturn data when both factory and period are selected
  const fetchReturnData = async () => {
    if (!selectedFactory || !selectedPeriod) {
      alert("Please select both a factory and reporting period.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/half-yearly-return/data/${selectedFactory}/${selectedPeriod}`
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
    if (!selectedFactory || !selectedPeriod) {
      alert("Please select a factory and reporting period first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/half-yearly-return/generate-pdf/${selectedFactory}/${selectedPeriod}`
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
            setReturnData(null);
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
              setReturnData(null);
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
            onClick={fetchReturnData} 
            style={{ 
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            View Data
          </button>
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

      {returnData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Half Yearly Return Data</h3>
          <div style={{ background: "#f4f4f4", padding: "20px", borderRadius: "5px" }}>
            <h4>Factory Information</h4>
            <p><strong>Factory Name:</strong> {returnData.factory_name}</p>
            <p><strong>Occupier Name:</strong> {returnData.occupier_name}</p>
            <p><strong>Reporting Period:</strong> {formatDate(returnData.reporting_period)}</p>
            
            <h4 style={{ marginTop: "20px" }}>Mandays Worked</h4>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ backgroundColor: "#e0e0e0" }}>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>Category</th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>Male</th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>Female</th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>Adults</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{returnData.mandays_adults_male}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{returnData.mandays_adults_female}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{returnData.mandays_adults_total}</td>
                </tr>
                {/* Add other rows similarly */}
              </tbody>
            </table>
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