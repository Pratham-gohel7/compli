import { useEffect, useContext } from "react";
import { FormContext } from "../context/FormContext";
import { fetchContractorEmployees, fetchContractorDetails } from "../services/apiService";

const useContractorData = (selectedCompanyId, selectedYear) => {
    const { setFormData } = useContext(FormContext);

    useEffect(() => {
        if (!selectedCompanyId || !selectedYear) return;

        const fetchContractorData = async () => {
            try {
                const [contractorData, contractorDetails] = await Promise.all([
                    fetchContractorEmployees(selectedCompanyId, selectedYear),
                    fetchContractorDetails(selectedCompanyId, selectedYear),
                ]);

                const contractor = contractorDetails.length > 0 ? contractorDetails[0] : {};

                setFormData((prev) => ({
                    ...prev,
                    employeeDetails: {
                        ...prev.employeeDetails, // Preserve existing employee details
                        contractor: {
                            skilled: contractorData?.skilled || 0,
                            total: contractorData?.total || 0,
                            male: contractorData?.male || 0,
                            female: contractorData?.female || 0,
                        },
                    },
                    contractorInfo: {
                        nameAddress: contractor?.contractor_name || "",
                        workNature: contractor?.nature_of_work || "",
                        contractLabourDays: contractor?.contract_days || "",
                        contractManDaysWorked: contractor?.contract_man_days || "",
                        directLabourDays: contractor?.direct_labour_days || "",
                        directManDaysWorked: contractor?.direct_man_days || "",
                        establishmentChanges: contractor?.establishment_changes || "",
                    },
                }));
            } catch (error) {
                console.error("❌ Error fetching contractor data:", error);
            }
        };

        fetchContractorData();
    }, [selectedCompanyId, selectedYear]);

};

export default useContractorData;
