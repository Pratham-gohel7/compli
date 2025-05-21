import React, { useState, useEffect } from "react";
import axios from "axios";

const FormNo15 = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null); // Ensure it's stored as an integer
    const [natureOfWork, setNatureOfWork] = useState("");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // 🔹 Fetch all companies on component mount
    useEffect(() => {
        axios.get(`${API_BASE_URL}/companies`)
            .then(response => {
                setCompanies(response.data);
                console.log("✅ Companies fetched:", response.data);
            })
            .catch(error => console.error("❌ Error fetching companies:", error));
    }, []);

    // 🔹 Fetch employees when selectedCompanyId changes
    useEffect(() => {
        if (selectedCompanyId !== null) {
            setLoading(true);
            console.log("📌 Fetching employees for company_id:", selectedCompanyId);

            axios.get(`${API_BASE_URL}/employees?company_id=${selectedCompanyId}`)
                .then(response => {
                    console.log("✅ Employees fetched:", response.data);
                    setEmployees(response.data);
                })
                .catch(error => {
                    console.error("❌ Error fetching employees:", error);
                    setEmployees([]);
                })
                .finally(() => setLoading(false));
        } else {
            setEmployees([]);
            setNatureOfWork("");
        }
    }, [selectedCompanyId]);

    // 🔹 Handle company selection
    const handleCompanyChange = (event) => {
        const companyId = parseInt(event.target.value, 10); // Ensure integer value
        console.log("📌 Selected company_id:", companyId);

        setSelectedCompanyId(companyId);

        const selectedCompany = companies.find(c => c.company_id === companyId);
        setNatureOfWork(selectedCompany ? selectedCompany.nature_of_work : "Not Available");
    };

    // 🔹 Submit form data
    const handleSubmit = async () => {
        if (!selectedCompanyId || employees.length === 0) {
            alert("Please select a company and ensure there are employees listed.");
            return;
        }

        const payload = employees.map(employee => ({
            company_id: selectedCompanyId, // Use selected company ID
            employee_id: employee.employee_id,
            date_of_birth: employee.date_of_birth || null,
            sex: employee.sex || null,
            address: employee.address || null,
            father_husbandname: employee.father_husbandname || null,
            date_of_appointment: employee.date_of_joining || null,
            alphabet_assigned: employee.alphabet_assigned || null,
            nature_of_work: natureOfWork || "Not Available",
            number_of_relay: employee.number_of_relay || null,
            certificate_number_date: employee.certificate_number_date || null,
            section_68_token_number: employee.section_68_token_number || null,
            remarks: employee.remarks || null
        }));

        try {
            const response = await axios.post(`${API_BASE_URL}/formno15/bulk`, { data: payload });
            console.log("✅ Data submitted:", response.data);
            alert("✅ Data submitted successfully!");
        } catch (error) {
            console.error("❌ Error submitting data:", error.response?.data || error.message);
            alert(`❌ Submission Failed: ${JSON.stringify(error.response?.data)}`);
        }
    };

    return (
        <div className="form-container">
            {/* Company Selection */}
            <div className="form-group">
                <label>Select Company:</label>
                <select name="company" value={selectedCompanyId || ""} onChange={handleCompanyChange}>
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Employee Table */}
            <div className="table-container">
                <table className="table-data">
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Sex</th>
                            <th>Residential Address</th>
                            <th>Father's/Husband's Name</th>
                            <th>Date of Appointment</th>
                            <th>Alphabet Assigned</th>
                            <th>Nature of Work</th>
                            <th>No. of Relay</th>
                            <th>Certificate of Fitness</th>
                            <th>No. Under Section 68</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="13" style={{ textAlign: "center" }}>Loading employees...</td>
                            </tr>
                        ) : employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{employee.first_name}</td>
                                    <td>{employee.date_of_birth}</td>
                                    <td>{employee.sex}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.father_husbandname}</td>
                                    <td>{employee.date_of_joining}</td>
                                    <td>{employee.alphabet_assigned}</td>
                                    <td>{natureOfWork}</td>
                                    <td>{employee.number_of_relay}</td>
                                    <td>{employee.certificate_number_date}</td>
                                    <td>{employee.section_68_token_number}</td>
                                    <td>{employee.remarks}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" style={{ textAlign: "center", color: "red" }}>
                                    No employees found for this company
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Submit Button */}
            <button onClick={handleSubmit} className="submit-btn">Submit</button>
        </div>
    );
};

export default FormNo15;
