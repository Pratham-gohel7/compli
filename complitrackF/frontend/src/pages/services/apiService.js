import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const fetchCompanyDetails = async (companyId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/companies/${companyId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching company details:", error);
        return null;
    }
};

export const fetchDirectEmployees = async (companyId, year) => {
    // if (!year) return null; // ✅ Prevent API call if year is not selected

    try {
        const response = await axios.get(`${API_BASE_URL}/attendance/employees/${companyId}?year=${year}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching direct employees:", error);
        return null;
    }
};

export const fetchTotalManDays = async (companyId, year) => {
    // if (!year) return 0; // ✅ Prevent API call if year is not selected

    try {
        const response = await axios.get(`${API_BASE_URL}/attendance/total-mandays/${companyId}?year=${year}`);
        return response.data.totalManDays;
    } catch (error) {
        console.error("❌ Error fetching total man-days worked:", error);
        return 0;
    }
};

export const fetchContractorEmployees = async (companyId, year) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/contractor/employees/${companyId}?year=${year}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching contractor employees:", error);
        return null;
    }
};

export const fetchContractorDetails = async (companyId, selectedYear) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/contractors/${companyId}/${selectedYear}`);
        console.log("✅ Contractor Details:", response.data);
        return response.data; // ✅ Return the fetched data
    } catch (error) {
        console.error("❌ Error fetching contractor details:", error);
        return null; // ✅ Return null in case of an error
    }
};

export const saveAnnualReturn = async (companyId, year, formData) => {
    try {
        // ✅ Convert formData into a plain JSON object (avoid circular references)
        const cleanFormData = JSON.parse(JSON.stringify(formData));

        const response = await axios.post(`${API_BASE_URL}/annualreturn/save`, {
            company_id: companyId,
            year,
            form_data: cleanFormData  // ✅ Use cleaned JSON object
        });

        console.log("✅ Annual Return Saved:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error saving annual return:", error);
        throw error;
    }
};

export const saveReturn85 = async (formData) => {
    try {
        // ✅ Convert formData into a plain JSON object (avoid circular references)
        const cleanFormData = JSON.parse(JSON.stringify(formData));

        const response = await fetch(`${API_BASE_URL}/returns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            form_data: cleanFormData
        });

        console.log("✅ Annual Return Saved:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error saving annual return:", error);
        throw error;
    }
};


// ✅ Correct Export - Ensure no duplicate exports
export { fetchCompanyDetails };
