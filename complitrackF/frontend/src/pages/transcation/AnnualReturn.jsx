// new code for the wizard style form
import { useState, useContext, useEffect } from "react";
import { FormContext } from "../context/FormContext";
import useCompanyData from "../hooks/useCompanyData";
import useEmployeeData from "../hooks/useEmployeeData";
import useContractorData from "../hooks/useContractorData";
import axios from "axios";

import CompanySelector from "../component/CompanySelector";
import YearSelector from "../component/YearSelector";
import CompanyInfo from "../component/CompanyInfo";
import EmployeeDetailsSection from "../component/EmployeeDetailsSection";
import { saveAnnualReturn } from "../services/apiService";
import PartA from "../component/PartA";
import PartB from "../component/PartB";
import PartC from "../component/PartC";
import YearlyReturn from "../component/YearlyReturn";
import PartD_A from "../component/PartD_A";
import PartD_B from "../component/PartD_B";
import PartD_CDE from "../component/PartD_CDE";
import PartD_F from "../component/PartD_F";
import PartD_G from "../component/PartD_G";
import PartD_H from "../component/PartD_H";

const AnnualReturn = () => {
    const { formData, setFormData, selectedCompanyId, setSelectedCompanyId } = useContext(FormContext);
    const [selectedYear, setSelectedYear] = useState("");
    const [currentStep, setCurrentStep] = useState(0);

    // ✅ Fetch Data Hooks
    useCompanyData(selectedCompanyId, selectedYear, setFormData);
    useEmployeeData(selectedCompanyId, selectedYear, setFormData);
    useContractorData(selectedCompanyId, selectedYear, setFormData);

    // ✅ Handles Form Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            companyInfo: {
                ...prev.companyInfo,
                [name]: value,
            },
            employeeDetails: {
                ...prev.employeeDetails,
                [name]: value,
            },
            partA: { // ✅ Store PartA data separately
                ...prev.partA,
                [name]: value,
            },
            partB: {
                ...prev.partB,
                [name]: value,
            },
            partC: {
                ...prev.partC,
                [name]: value,
            },
            yearlyReturn: {
                ...prev.yearlyReturn,
                [name]: value,
            },
            partD:{
                partD_A: {
                    ...prev.PartD_A,
                    [name]: value,
                },
                partD_B: {
                    ...prev.PartD_B,
                    [name]: value,
                },
                partD_CDE: {
                    ...prev.PartD_CDE,
                    [name]: value,
                },
                partD_F: {
                    ...prev.PartD_F,
                    [name]: value,
                },
                partD_G: {
                    ...prev.PartD_G,
                    [name]: value,
                },
                partD_H: {
                    ...prev.PartD_H,
                    [name]: value,
                }

            }
        }));
        console.log("Updated Form Data:", formData); 
    };


    // ✅ Multi-Step Form Steps
    const steps = [
        <CompanyInfo formData={formData?.companyInfo} handleChange={handleChange} />,
        // <EmployeeDetailsSection
        //     handleChange={handleChange}
        //     directSkilled={formData?.employeeDetails?.direct?.skilled || 0}
        //     directTotal={formData?.employeeDetails?.direct?.total || 0}
        //     directMale={formData?.employeeDetails?.direct?.male || 0}
        //     directFemale={formData?.employeeDetails?.direct?.female || 0}
        //     contractorSkilled={formData?.employeeDetails?.contractor?.skilled || 0}
        //     contractorTotal={formData?.employeeDetails?.contractor?.total || 0}
        //     contractorMale={formData?.employeeDetails?.contractor?.male || 0}
        //     contractorFemale={formData?.employeeDetails?.contractor?.female || 0}
        // />,
        <EmployeeDetailsSection formData={formData?.employeeDetails} handleChange={handleChange} />,
        <PartA formData={formData?.partA} handleChange={handleChange} />,
        <PartB formData={formData?.partB} handleChange={handleChange}/>,
        <PartC formData={formData?.partC} handleChange={handleChange}/>,
        <YearlyReturn formData={formData?.yearlyReturn} handleChange={handleChange} />,
        <PartD_A formData={formData?.partD.partD_A} handleChange={handleChange}/>,
        <PartD_B formData={formData?.partD.partD_B} handleChange={handleChange}/>,
        <PartD_CDE formData={formData?.partD.partD_CDE} handleChange={handleChange}/>,
        <PartD_F formData={formData?.partD.partD_F} handleChange={handleChange}/>,
        <PartD_G formData={formData?.partD.partD_G} handleChange={handleChange}/>,
        <PartD_H formData={formData?.partD.partD_H} handleChange={handleChange}/>,
    ];

    // ✅ Navigation Functions
    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    // ✅ Submitting Data to API
    const submitForm = async () => {
        try {
            console.log("📌 Form Data Before Saving:", formData); // ✅ Check for circular structure
            await saveAnnualReturn(selectedCompanyId, selectedYear, formData);
            alert("Annual Return Saved Successfully!");
        } catch (error) {
            alert("Failed to Save Annual Return");
        }
    };

    return (
        <div className="form-container">
            {/* ✅ Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
            </div>

            {/* ✅ Input Selectors */}
            <div className="take-input">
                <CompanySelector onSelect={setSelectedCompanyId} />
                <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            </div>

            {/* ✅ Render Current Step */}
            <div className="form-step">{steps[currentStep]}</div>

            {/* ✅ Navigation Buttons */}
            <div className="form-navigation">
                {currentStep > 0 && <button onClick={prevStep} className="btn btn-secondary">Previous</button>}
                {currentStep < steps.length - 1 && <button onClick={nextStep} className="btn btn-primary">Next</button>}
                {currentStep === steps.length - 1 && <button onClick={submitForm} className="btn btn-primary">Submit</button>}
            </div>
        </div>
    );
};

export default AnnualReturn;



// import { useState, useContext, useEffect } from "react";
// import { FormContext } from "../context/FormContext";
// import useCompanyData from "../hooks/useCompanyData";
// import useEmployeeData from "../hooks/useEmployeeData";
// import useContractorData from "../hooks/useContractorData";
// import { saveAnnualReturn } from "../services/apiService";

// import CompanySelector from "../component/CompanySelector";
// import YearSelector from "../component/YearSelector";
// import CompanyInfo from "../component/CompanyInfo";
// import EmployeeDetailsSection from "../component/EmployeeDetailsSection";
// import PartA from "../component/PartA";
// import PartB from "../component/PartB";
// import PartC from "../component/PartC";
// import YearlyReturn from "../component/YearlyReturn";
// import PartD_A from "../component/PartD_A";
// import PartD_B from "../component/PartD_B";
// import PartD_CDE from "../component/PartD_CDE";
// import PartD_F from "../component/PartD_F";
// import PartD_G from "../component/PartD_G";
// import PartD_H from "../component/PartD_H";

// const AnnualReturn = () => {
//     const { formData, setFormData, selectedCompanyId, setSelectedCompanyId } = useContext(FormContext);
//     const [selectedYear, setSelectedYear] = useState("");
//     const [currentStep, setCurrentStep] = useState(0);

//     // ✅ Fetch data when company or year changes
//     useCompanyData(selectedCompanyId, selectedYear, setFormData);
//     useEmployeeData(selectedCompanyId, selectedYear, setFormData);
//     useContractorData(selectedCompanyId, selectedYear, setFormData);

//     // ✅ Unified handleChange with section and nested partD handling
//     const handleChange = (e) => {
//         const { name, value, dataset } = e.target;
//         const section = dataset.section;
    
//         if (!section) {
//             console.warn("No section defined for input:", name);
//             return;
//         }
    
//         setFormData((prev) => {
//             const updated = { ...prev };
    
//             if (section.startsWith("partD_")) {
//                 updated.partD = {
//                     ...prev.partD,
//                     [section]: {
//                         ...prev.partD?.[section],
//                         [name]: value,
//                     },
//                 };
//             } else {
//                 updated[section] = {
//                     ...prev[section],
//                     [name]: value,
//                 };
//             }
    
//             return updated;
//         });
//     };
    

//     // ✅ Steps for the wizard
//     const steps = [
//         <CompanyInfo formData={formData?.companyInfo} handleChange={handleChange} />,
//         <EmployeeDetailsSection formData={formData?.employeeDetails} handleChange={handleChange} />,
//         <PartA formData={formData?.partA} handleChange={handleChange} />,
//         <PartB formData={formData?.partB} handleChange={handleChange} />,
//         <PartC formData={formData?.partC} handleChange={handleChange} />,
//         <YearlyReturn formData={formData?.yearlyReturn} handleChange={handleChange} />,
//         <PartD_A formData={formData?.partD?.partD_A} handleChange={handleChange} />,
//         <PartD_B formData={formData?.partD?.partD_B} handleChange={handleChange} />,
//         <PartD_CDE formData={formData?.partD?.partD_CDE} handleChange={handleChange} />,
//         <PartD_F formData={formData?.partD?.partD_F} handleChange={handleChange} />,
//         <PartD_G formData={formData?.partD?.partD_G} handleChange={handleChange} />,
//         <PartD_H formData={formData?.partD?.partD_H} handleChange={handleChange} />,
//     ];

//     // ✅ Navigation
//     const nextStep = () => {
//         if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
//     };

//     const prevStep = () => {
//         if (currentStep > 0) setCurrentStep((prev) => prev - 1);
//     };

//     // ✅ Final submission
//     const submitForm = async () => {
//         try {
//             console.log("📌 Form Data Before Saving:", formData);
//             await saveAnnualReturn(selectedCompanyId, selectedYear, formData);
//             alert("✅ Annual Return Saved Successfully!");
//         } catch (error) {
//             console.error("❌ Submission error:", error);
//             alert("❌ Failed to Save Annual Return");
//         }
//     };

//     return (
//         <div className="form-container">
//             {/* Progress Bar */}
//             <div className="progress-container">
//                 <div
//                     className="progress-bar"
//                     style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
//                 ></div>
//             </div>

//             {/* Company & Year Selection */}
//             <div className="take-input">
//                 <CompanySelector onSelect={setSelectedCompanyId} />
//                 <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
//             </div>

//             {/* Current Form Step */}
//             <div className="form-step">{steps[currentStep]}</div>

//             {/* Navigation Buttons */}
//             <div className="form-navigation">
//                 {currentStep > 0 && (
//                     <button onClick={prevStep} className="btn btn-secondary">
//                         Previous
//                     </button>
//                 )}
//                 {currentStep < steps.length - 1 && (
//                     <button onClick={nextStep} className="btn btn-primary">
//                         Next
//                     </button>
//                 )}
//                 {currentStep === steps.length - 1 && (
//                     <button onClick={submitForm} className="btn btn-success">
//                         Submit
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AnnualReturn;
