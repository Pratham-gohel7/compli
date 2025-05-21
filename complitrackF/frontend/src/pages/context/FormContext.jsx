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
            contractLabourDays: "",
            contractManDaysWorked: "",
            directLabourDays: "",
            directManDaysWorked: "",
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

                avgAdultEmployedMale: "",
                avgAdultEmployedFemale: "",
                avgAdultEmployedTotal: "",
                avgAdolescentEmployedMale: "",
                avgAdolescentEmployedFemale: "",
                avgAdolescentEmployedTotal: "",

                totalAdultManHoursMale: "",
                totalAdultManHoursFemale: "",
                totalAdultManHoursTotal: "",
                totalAdolescentManHoursMale: "",
                totalAdolescentManHoursFemale: "",
                totalAdolescentManHoursTotal: "",
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
                        accidentsOccurrences: "",
                        injuredInside: "",
                        injuredOutside: "",
                        fatalAccidents: "",
                        fatalInjuredInside: "",
                        fatalInjuredOutside: "",
                        fatalKilledInside: "",
                        fatalKilledOutside: ""
                    },
                    {
                        category: "Dangerous occurrences not involving injuries/deaths.",
                        accidentsOccurrences: "",
                        injuredInside: "",
                        injuredOutside: "",
                        fatalAccidents: "",
                        fatalInjuredInside: "",
                        fatalInjuredOutside: "",
                        fatalKilledInside: "",
                        fatalKilledOutside: ""
                    },
                    {
                        category: "Dangerous occurrences involving injuries/deaths.",
                        accidentsOccurrences: "",
                        injuredInside: "",
                        injuredOutside: "",
                        fatalAccidents: "",
                        fatalInjuredInside: "",
                        fatalInjuredOutside: "",
                        fatalKilledInside: "",
                        fatalKilledOutside: ""
                    },
                    {
                        category: "Major accidents involving injuries/deaths.",
                        accidentsOccurrences: "",
                        injuredInside: "",
                        injuredOutside: "",
                        fatalAccidents: "",
                        fatalInjuredInside: "",
                        fatalInjuredOutside: "",
                        fatalKilledInside: "",
                        fatalKilledOutside: ""
                    },
                    {
                        category: "Major accidents not involving injuries/deaths.",
                        accidentsOccurrences: "",
                        injuredInside: "",
                        injuredOutside: "",
                        fatalAccidents: "",
                        fatalInjuredInside: "",
                        fatalInjuredOutside: "",
                        fatalKilledInside: "",
                        fatalKilledOutside: ""
                    }
                ],
                
                // Section (3) - Injuries Table
                injuriesTable: Array(5).fill({
                    hazardousProcessAccidents: "",
                    hazardousProcessFatal: "",
                    hazardousProcessNonfatal: "",
                    dangerousOperationsAccidents: "",
                    dangerousOperationsFatal: "",
                    dangerousOperationsNonfatal: "",
                    otherAccidents: "",
                    otherFatal: "",
                    otherNonfatal: ""
                }),
                
                // Section (4) - Nonfatal Injuries
                nonfatalInjuriesCurrentYear: {
                    numberOfInjuries: "",
                    mandaysLost: ""
                },
                nonfatalInjuriesPreviousYear: {
                    numberOfInjuries: "",
                    mandaysLost: ""
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
