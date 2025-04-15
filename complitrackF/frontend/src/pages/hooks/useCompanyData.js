import { useEffect } from "react";
import { fetchCompanyDetails, fetchTotalManDays } from "../services/apiService";

const useCompanyData = (selectedCompanyId, selectedYear, setFormData) => {
    useEffect(() => {
        if (!selectedCompanyId || !selectedYear) return;

        const fetchData = async () => {
            try {
                const [company, totalManDaysWorked] = await Promise.all([
                    fetchCompanyDetails(selectedCompanyId),
                    fetchTotalManDays(selectedCompanyId, selectedYear),
                ]);

                if (company) {
                    setFormData((prev) => ({
                        ...prev,
                        companyInfo: {
                            nameOfEstablishment: company.company_name || "",
                            address: company.address || "",
                            employerName: company.employer_name || "",
                            employerAddress: company.employer_address || "",
                            managerName: company.manager_name || "",
                            managerAddress: company.manager_address || "",
                            registrationNo: company.establishment_reg_no || "",
                            industryType: company.nature_of_work || "",
                            totalWorkingDays: company.total_working_days || "",
                            totalManDays: totalManDaysWorked || 0,
                            avgEmployees: company.avg_employees || "",
                            totalWages: company.total_wages || "",
                            totalFine: company.total_fine || "",
                            otherDeductions: company.other_deductions || "",

                            // ✅ Contact Information
                            establishmentTeleNo: company.teleNo || "",
                            establishmentMobileNo: company.phone || "",
                            establishmentFaxNo: company.faxNo || "",
                            establishmentEmail: company.email || "",

                            employerTeleNo: company.employer_mobile || "",
                            employerMobileNo: company.employer_phoneno || "",
                            employerFaxNo: company.employer_fax || "",
                            employerEmail: company.employer_email || "",

                            managerTeleNo: company.manager_teleno || "",
                            managerMobileNo: company.manager_phoneno || "",
                            managerFaxNo: company.manager_fax || "",
                            managerEmail: company.manager_email || "",
                        },
                    }));
                }
            } catch (error) {
                console.error("❌ Error fetching company data:", error);
            }
        };

        fetchData();
    }, [selectedCompanyId, selectedYear]);
};

export default useCompanyData;
