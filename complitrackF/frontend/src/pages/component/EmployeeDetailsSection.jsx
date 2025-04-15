// components/sections/EmployeeDetailsSection.jsx

import React, {useState} from "react";
// directSkilled, directTotal, directMale, directFemale, contractorSkilled, contractorTotal, contractorMale, contractorFemale
const EmployeeDetailsSection = ({ formData, handleChange }) => {
  const [directSkilled, setDirectSkilled] = useState(
    formData?.direct?.skilled || 0
  );
  const [directTotal, setDirectTotal] = useState(
    formData?.employeeDetails?.direct?.total || 0
  );
  const [directMale, setDirectMale] = useState(
    formData?.employeeDetails?.direct?.mal || 0
  );
  const [directFemale, setDirectFemale] = useState(
    formData?.employeeDetails?.direct?.female || 0
  );
  const [contractorSkilled, setContractorSkilled] = useState(
    formData?.employeeDetails?.contractor?.skilled || 0
  );
  const [contractorTotal, setContractorTotal] = useState(
    formData?.employeeDetails?.contractor?.total || 0
  );
  const [contractorMale, setContractorMale] = useState(
    formData?.employeeDetails?.contractor?.male || 0
  );
  const [contractorFemale, setContractorFemale] = useState(
    formData?.employeeDetails?.contractor?.female || 0
  );

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
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              rowSpan="2"
            >
              Type of Worker
            </th>
            <th style={{ border: "1px solid black" }}>Unskilled</th>
            <th style={{ border: "1px solid black" }}>Semiskilled</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Skilled
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              rowSpan="2"
            >
              Total
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              rowSpan="2"
            >
              Male
            </th>
            <th
              style={{ border: "1px solid black", padding: "8px" }}
              rowSpan="2"
            >
              Female
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Direct
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directSkilled"
                value={formData?.directSkilled}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directTotal"
                value={formData?.directTotal}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directMale"
                value={formData?.directMale}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="directFemale"
                value={formData?.directFemale}
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
                value={formData?.contractorSkilled}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="contractorTotal"
                value={formData?.contractorTotal}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="contractorMale"
                value={formData?.contractorMale}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="number"
                name="contractorFemale"
                value={formData?.contractorFemale}
                onChange={handleChange}
                style={{ width: "70px", textAlign: "center" }}
              />
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Total
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>0</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {Number(directSkilled) + Number(contractorSkilled)}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {Number(directTotal) + Number(contractorTotal)}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {Number(directMale) + Number(contractorMale)}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {Number(directFemale) + Number(contractorFemale)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetailsSection;
