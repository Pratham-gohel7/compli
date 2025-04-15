import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableCompany, setEditableCompany] = useState(null);

  // Fetch companies from backend
  const fetchCompanies = () => {
    axios.get("http://localhost:5001/api/companies")
      .then(response => setCompanies(response.data))
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle file upload
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios.post("http://localhost:5001/api/upload-company", formData)
      .then(() => {
        alert("File uploaded successfully!");
        fetchCompanies(); // Refresh data
      })
      .catch(error => {
        alert("Error uploading file.");
        console.error("Error:", error);
      });
  };

  // Open edit form with selected company data
  const handleEditClick = (company) => {
    setEditableCompany(company);
    setIsEditing(true);
  };

  // Handle input change in edit form
  const handleInputChange = (e) => {
    setEditableCompany({ ...editableCompany, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const handleUpdate = () => {
    axios.put(`http://localhost:5001/api/companies/update/${editableCompany.company_id}`, editableCompany)
      .then(() => {
        alert("Company updated successfully!");
        setIsEditing(false); // Close form
        fetchCompanies(); // Refresh data
      })
      .catch(error => {
        alert("Error updating company.");
        console.error("Error:", error);
      });
  };

  return (

    <div className="display-container">
      {/* File Upload Section */}
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleFileUpload} className="upload-btn">Upload File</button>
      </div>

      <h2>Company Data</h2>
      <div className="table-container">
        <table className="table-data">
          <thead>
            <tr>
              <th>Company License</th>
              <th>Company Name</th>
              <th>Address</th>
              <th>Establishment Reg No</th>
              <th>Nature of Work</th>
              <th>Date of Incorporation</th>
              <th>Employer Name</th>
              <th>Employer Address</th>
              <th>Employer Phone no</th>
              <th>Manager Name</th>
              <th>Manager Address</th>
              <th>Manager Phone no</th>
              <th>PF Reg No</th>
              <th>ESI Reg No</th>
              <th>GST No</th>
              <th>PAN No</th>
              <th>TAN No</th>
              <th>LWF No</th>
              <th>PT Reg No</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.company_id}>
                <td>{company.company_id}</td>
                <td>{company.company_name || ""}</td>
                <td>{company.address || ""}</td>
                <td>{company.establishment_reg_no || ""}</td>
                <td>{company.nature_of_work || ""}</td>
                <td>{company.date_of_incorporation || ""}</td>
                <td>{company.employer_name || ""}</td>
                <td>{company.employer_address || ""}</td> {/* Newly added */}
                <td>{company.employer_phoneno || ""}</td> {/* Newly added */}
                <td>{company.manager_name || ""}</td> {/* Newly added */}
                <td>{company.manager_address || ""}</td> {/* Newly added */}
                <td>{company.manager_phoneno || ""}</td> {/* Newly added */}
                <td>{company.pf_reg_no || ""}</td>
                <td>{company.esi_reg_no || ""}</td>
                <td>{company.gst_no || ""}</td>
                <td>{company.pan_no || ""}</td>
                <td>{company.tan_no || ""}</td>
                <td>{company.lwf_no || ""}</td>
                <td>{company.pt_reg_no || ""}</td>
                <td>{company.phone || ""}</td>
                <td>{company.email || ""}</td>
                <td>
                  <button onClick={() => handleEditClick(company)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Company</h2>
            <form className="edit-form">
              <div className="input-group">
                <label>Company Name</label>
                <input type="text" name="company_name" value={editableCompany.company_name} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Address</label>
                <input type="text" name="address" value={editableCompany.address} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Establishment Reg No</label>
                <input type="text" name="establishment_reg_no" value={editableCompany.establishment_reg_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Employer Name</label>
                <input type="text" name="employer_name" value={editableCompany.employer_name} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Nature of Work</label>
                <input type="text" name="nature_of_work" value={editableCompany.nature_of_work} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Date of Incorporation</label>
                <input type="text" name="date_of_incorporation" value={editableCompany.date_of_incorporation} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>PF Reg No</label>
                <input type="text" name="pf_reg_no" value={editableCompany.pf_reg_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>ESI Reg No</label>
                <input type="text" name="esi_reg_no" value={editableCompany.esi_reg_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>GST No</label>
                <input type="text" name="gst_no" value={editableCompany.gst_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>PAN No</label>
                <input type="text" name="pan_no" value={editableCompany.pan_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>TAN No</label>
                <input type="text" name="tan_no" value={editableCompany.tan_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>LWF No</label>
                <input type="text" name="lwf_no" value={editableCompany.lwf_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>PT Reg No</label>
                <input type="text" name="pt_reg_no" value={editableCompany.pt_reg_no} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="text" name="phone" value={editableCompany.phone} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="text" name="email" value={editableCompany.email} onChange={handleInputChange} />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleUpdate} className="update-btn">Update</button>
                <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
