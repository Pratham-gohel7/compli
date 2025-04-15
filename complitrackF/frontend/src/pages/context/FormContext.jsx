import { createContext, useState, useMemo } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const initialFormData = {
        companyInfo: {
            nameOfEstablishment: "",
            address: "",
            establishmentTeleNo: "",
            establishmentMobileNo: "",
            establishmentFaxNo: "",
            establishmentEmail: "",
            employerName: "",
            employerAddress: "",
            employerTeleNo: "",
            employerMobileNo: "",
            employerFaxNo: "",
            employerEmail: "",
            managerName: "",
            managerAddress: "",
            managerTeleNo: "",
            managerMobileNo: "",
            managerFaxNo: "",
            managerEmail: "",
            registrationNo: "",
            industryType: ""
        },
        employeeDetails: {
            directSkilled: 0,
            directTotal: 0,
            directMale: 0,
            directFemale: 0,
            contractorSkilled: 0,
            contractorTotal: 0,
            contractorMale: 0,
            contractorFemale: 0
        },
        partA: {
            totalWorkingDays: "",
            totalManDays: "",
            avgEmployees: "",
            totalWages: "",
            totalFine: "",
            otherDeductions: ""
        },
        partB: {
            bonusPercentage: "",
            bonusBeneficiaries: "",
            totalBonusPaid: "",
            bonusPaymentDate: "",
            bonusNotPaidReason: ""
        },
        partC: {
            contractorNameAddress: "",
            contractorWorkNature: "",
            contractLabourDays: 0,
            contractManDaysWorked: 0,
            directLabourDays: 0,
            directManDaysWorked: 0,
            establishmentChanges: "",
        },
        yearlyReturn: {
            showYearlyReturn: "No",
            contractDuration: "",
            daysWorked: "",
            averageContractLabour: "",
            workingHours: "",
            overtimeWork: "",
            weeklyHoliday: "",
            spreadOver: "",
            weeklyHolidayPaid: "",
            maleManDays: "",
            femaleManDays: "",
            totalManDays: "",
            wagesPaid: "",
            wageDeductions: "",
            canteen: "Yes",
            restrooms: "Yes",
            drinkingWater: "Yes",
            creches: "Yes",
            firstAid: "Yes"
        },
        partD: {
            partD_A: {
                factoryIdentification: "",
                nicCode: "",
                sector: "",
                registrationSection: "",
                registrationNo: "",
                licenseNo: "",
                licensedWorkers: "",
                licensedHP: "",
                licenseRenewalYear: "",
                licenseRenewalApplicationYear: "",
                planApprovalNo: "",
                finishedProducts: "",
                intermediates: "",
                rawMaterials: ""
            },
            partD_B: {
                averageDailyMale: "",
                averageDailyFemale: "",
                daysWorked: "",
                manDaysWorked: "",
                adultMale: "",
                adultFemale: "",
                adultTotal: "",
                adolescentMale: "",
                adolescentFemale: "",
                adolescentTotal: "",
                totalManHoursWorked: ""
            },
            partD_CDE: {
                preventionMeasures: "Yes",
                drinkingWater: "Yes",
                urinalsAndLatrines: "Yes",
                healthRecords: "Yes",
                occupationalHealthCenter: "Yes",
                medicalOfficer: "Yes",
                industrialHygienists: "Yes",
                safetyProvisions: "Yes",
                safeAccess: "Yes",
                fireExits: "Yes",
                fireFightingEquipment: "Yes",
                hoistsLiftsCertified: "Yes",
                pressureVessels: "Yes",
                protectiveEquipments: "Yes",
                safetyOfficers: "Yes",
                safetyCommittee: "Yes",
                chapterIV_A: "Yes",
                safetyTraining: "Yes",
                onsiteEmergencyPlan: "Yes",
                rehearsalsDone: "Yes",
                safetyPolicyAudit: "Yes",
                hazardInformation: "Yes",
                firstAidFacilities: "Yes",
                ambulanceProvision: "Yes",
                canteenFacility: "Yes",
                canteenManaged: "Run departmentally",
                restLunchRooms: "Yes",
                crecheFacility: "Yes",
                welfareOfficer: "Yes"
            },
            partD_F: {
                workingHoursCompliance: "Yes",
                noticePeriodDisplayed: "Yes",
                firstShiftStart: "",
                firstShiftEnd: "",
                secondShiftStart: "",
                secondShiftEnd: "",
                thirdShiftStart: "",
                thirdShiftEnd: "",
                generalShiftStart: "",
                generalShiftEnd: "",
                womenWorkingHoursRelaxation: "Yes",
                certificatesOfFitness: "Yes"
            },
            partD_G: {
                leaveWithWagesAllowed: "Yes",
                workersDischarged: "",
                wagesInLieu: "",
                directMale: "",
                directFemale: "",
                directTotal: "",
                entitledMale: "",
                entitledFemale: "",
                entitledTotal: "",
                grantedMale: "",
                grantedFemale: "",
                grantedTotal: "",
                youngDirectMale: "",
                youngDirectFemale: "",
                youngDirectTotal: "",
                youngEntitledMale: "",
                youngEntitledFemale: "",
                youngEntitledTotal: "",
                youngGrantedMale: "",
                youngGrantedFemale: "",
                youngGrantedTotal: ""
            },
            partD_H: {
                // Section H - Reporting of Accidents
                accidentReporting: "Yes",
                
                // Table 1: Number of Accidents and Dangerous Occurrences
                accidentsTable: [
                    ["", "", "", "", "", "", "", ""], // Row 1
                    ["", "", "", "", "", "", "", ""], // Row 2
                    ["", "", "", "", "", "", "", ""], // Row 3
                    ["", "", "", "", "", "", "", ""], // Row 4
                    ["", "", "", "", "", "", "", ""]  // Row 5
                ],
                
                // Table 2: Injuries Inside the Factory
                injuriesTable: [
                    ["", "", "", "", "", "", "", "", ""], // Row 1
                    ["", "", "", "", "", "", "", "", ""], // Row 2
                    ["", "", "", "", "", "", "", "", ""], // Row 3
                    ["", "", "", "", "", "", "", "", ""]  // Row 4
                ],
                
                // Nonfatal Injuries Section
                nonfatal_injuries_same_year: "",
                mandays_lost: "",
                nonfatal_injuries_prev_year: "",
                mandays_lost_prev_year: ""
            }
        }
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    const contextValue = useMemo(() => ({
        formData,
        setFormData,
        selectedCompanyId,
        setSelectedCompanyId
    }), [formData, selectedCompanyId]);

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};
