import React, { useEffect, useState } from "react";
import axios from "axios";



const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);  // New state for company data
  const [file, setFile] = useState(null);




  const fetchdata = () => {
    axios.get("http://localhost:5001/api/employees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees data:", error);
      });

    // Fetch company data
    axios.get("http://localhost:5001/api/companies")
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error("Error fetching company data:", error);
      });
  };


  // Fetch employee and company data when component is mounted
  useEffect(() => {
    fetchdata();
  }, []);

  // Handling file change event
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handling file upload to backend
  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios.post("http://localhost:5001/api/employees/upload", formData)
      .then(response => {
        alert("File uploaded successfully!");
        fetchdata();
      })
      .catch(error => {
        alert("Error uploading file.");
        console.error("Error uploading file:", error);
      });
  };

  // Function to get company name based on company_id
  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company.company_id === companyId);
    return company ? company.company_name : "Unknown"; // Return company name or "Unknown" if not found
  };

  return (


    <div className="display-container">

      {/* File Upload Section */}
      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleFileUpload} className="upload-btn">Upload File</button>
      </div>
      <h2>Employee Data</h2>

      {/* Employee Table */}
      <div className="table-container">
        <table className="table-data">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Company Name</th> {/* Changed from Company ID to Company Name */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Sex</th>

              <th>address</th>
              <th>Father/Husband Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Employment Type</th>
              <th>Alphabet_assigned</th>
              <th>Date of Joining</th>
              <th>Exit Date</th>
              <th>Mode of Payment</th>
              <th>Nationality</th>
              <th>State of Domicile</th>
              <th>Aadhaar Number</th>
              <th>PAN Number</th>
              <th>UAN Number</th>
              <th>ESIC Number</th>
              <th>Weekly Off Days</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employee_id}</td>
                <td>{getCompanyName(employee.company_id)}</td> {/* Use the getCompanyName function */}
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.date_of_birth}</td>
                <td>{employee.sex}</td>
                <td>{employee.address}</td>
                <td>{employee.father_husbandname}</td>
                <td>{employee.designation}</td>
                <td>{employee.department}</td>
                <td>{employee.employment_type}</td>
                <td>{employee.alphabet_assigned}</td>
                <td>{employee.date_of_joining}</td>
                <td>{employee.exit_date}</td>
                <td>{employee.mode_of_payment}</td>
                <td>{employee.nationality}</td>
                <td>{employee.state_of_domicile}</td>
                <td>{employee.aadhaar_number}</td>
                <td>{employee.pan_number}</td>
                <td>{employee.uan_number}</td>
                <td>{employee.esic_number}</td>
                <td>{employee.weekly_off_days}</td>
                {/* <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
};

export default EmployeePage;
