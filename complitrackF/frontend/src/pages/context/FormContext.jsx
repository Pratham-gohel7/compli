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
            totalWagesMan: "",
            totalWagesWomen: "",
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
                // Section (1)
                accidentReporting: "Yes",
                
                // Section (2) - Accidents Table
                accidentsTable: [
                    {
                        category: "Accidents including dangerous occurrences and major accidents involving injuries/deaths.",
                        accidentsOccurrences: 0,
                        injuredInside: 0,
                        injuredOutside: 0,
                        fatalAccidents: 0,
                        fatalInjuredInside: 0,
                        fatalInjuredOutside: 0,
                        fatalKilledInside: 0,
                        fatalKilledOutside: 0
                    },
                    {
                        category: "Dangerous occurrences not involving injuries/deaths.",
                        accidentsOccurrences: 0,
                        injuredInside: 0,
                        injuredOutside: 0,
                        fatalAccidents: 0,
                        fatalInjuredInside: 0,
                        fatalInjuredOutside: 0,
                        fatalKilledInside: 0,
                        fatalKilledOutside: 0
                    },
                    {
                        category: "Dangerous occurrences involving injuries/deaths.",
                        accidentsOccurrences: 0,
                        injuredInside: 0,
                        injuredOutside: 0,
                        fatalAccidents: 0,
                        fatalInjuredInside: 0,
                        fatalInjuredOutside: 0,
                        fatalKilledInside: 0,
                        fatalKilledOutside: 0
                    },
                    {
                        category: "Major accidents involving injuries/deaths.",
                        accidentsOccurrences: 0,
                        injuredInside: 0,
                        injuredOutside: 0,
                        fatalAccidents: 0,
                        fatalInjuredInside: 0,
                        fatalInjuredOutside: 0,
                        fatalKilledInside: 0,
                        fatalKilledOutside: 0
                    },
                    {
                        category: "Major accidents not involving injuries/deaths.",
                        accidentsOccurrences: 0,
                        injuredInside: 0,
                        injuredOutside: 0,
                        fatalAccidents: 0,
                        fatalInjuredInside: 0,
                        fatalInjuredOutside: 0,
                        fatalKilledInside: 0,
                        fatalKilledOutside: 0
                    }
                ],
                
                // Section (3) - Injuries Table
                injuriesTable: Array(5).fill({
                    hazardousProcessAccidents: 0,
                    hazardousProcessFatal: 0,
                    hazardousProcessNonfatal: 0,
                    dangerousOperationsAccidents: 0,
                    dangerousOperationsFatal: 0,
                    dangerousOperationsNonfatal: 0,
                    otherAccidents: 0,
                    otherFatal: 0,
                    otherNonfatal: 0
                }),
                
                // Section (4) - Nonfatal Injuries
                nonfatalInjuriesCurrentYear: {
                    numberOfInjuries: 0,
                    mandaysLost: 0
                },
                nonfatalInjuriesPreviousYear: {
                    numberOfInjuries: 0,
                    mandaysLost: 0
                },
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
