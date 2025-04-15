import { useEffect } from "react";
import { fetchDirectEmployees } from "../services/apiService";

const useEmployeeData = (selectedCompanyId, selectedYear, setFormData) => {
    useEffect(() => {
        if (!selectedCompanyId || !selectedYear) return;

        const fetchData = async () => {
            try {
                const directData = await fetchDirectEmployees(selectedCompanyId, selectedYear);

                setFormData((prev) => ({
                    ...prev,
                    employeeDetails: {
                        ...prev.employeeDetails, // Preserve existing employee details
                        direct: {
                            skilled: directData?.skilled || 0,
                            total: directData?.total || 0,
                            male: directData?.male || 0,
                            female: directData?.female || 0,
                        },
                    },
                }));
            } catch (error) {
                console.error("❌ Error fetching employee data:", error);
            }
        };

        fetchData();
    }, [selectedCompanyId, selectedYear]);

};

export default useEmployeeData;
