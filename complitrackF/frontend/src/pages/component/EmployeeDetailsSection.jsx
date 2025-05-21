import React, {useEffect} from "react";

const EmployeeDetailsSection = ({ formData, handleChange }) => {

  useEffect(() => {
    const totalContractor = Number(formData.contractorMale || 0) + Number(formData.contractorFemale || 0);
    if (formData.contractorTotal !== totalContractor) {
      handleChange({ target: { name: "contractorTotal", value: totalContractor } });
    }

    const totalDirect = Number(formData.directMale || 0) + Number(formData.directFemale || 0);
    if (formData.directTotal !== totalDirect) {
      handleChange({ target: { name: "directTotal", value: totalDirect } });
    }
  }, [formData.contractorMale, formData.contractorFemale, formData.directMale, formData.directFemale]);

  // Auto-compute totals whenever formData changes
  const computedTotals = {
    directTotal: Number(formData.directTotal || 0),
    contractorTotal: Number(formData.contractorTotal || 0),
    skilledTotal: Number(formData.directSkilled || 0) + Number(formData.contractorSkilled || 0),
    workersTotal: Number(formData.directSkilled || 0) + Number(formData.contractorSkilled || 0),
    maleTotal: Number(formData.directMale || 0) + Number(formData.contractorMale || 0),
    femaleTotal: Number(formData.directFemale || 0) + Number(formData.contractorFemale || 0),
  };

  return (
    <div>
      <label>Number of Employees Employed (Including Contract Workers)</label>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }} rowSpan="2">
              Type of Worker
            </th>
            <th style={{ border: "1px solid black" }}>Unskilled</th>
            <th style={{ border: "1px solid black" }}>Semiskilled</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Skilled</th>
            <th style={{ border: "1px solid black", padding: "8px" }} rowSpan="2">
              Male
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }} rowSpan="2">
              Female
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }} rowSpan="2">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>Direct</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directSkilled"
                value={formData.directSkilled || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directMale"
                value={formData.directMale || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directFemale"
                value={formData.directFemale || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directTotal"
                value={formData.directTotal || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Through Contractor
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="contractorSkilled"
                value={formData.contractorSkilled || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="contractorMale"
                value={formData.contractorMale || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="contractorFemale"
                value={formData.contractorFemale || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="contractorTotal"
                value={formData.contractorTotal || ''}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px", fontWeight: "bold" }}>
              Total
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {computedTotals.skilledTotal}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {computedTotals.maleTotal}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {computedTotals.femaleTotal}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {computedTotals.workersTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetailsSection;
