// components/CompanySelector.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const CompanySelector = ({ onSelect }) => {
    const [companies, setCompanies] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/companies/annualreport`)
            .then((response) => setCompanies(response.data))
            .catch((error) => console.error("❌ Error fetching companies:", error));
    }, []);

    return (
        <>
            <label>Select Company:</label>
            <div>

                <select onChange={(e) => onSelect(e.target.value)}>
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default CompanySelector;
