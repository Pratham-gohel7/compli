import { useState, useContext } from "react";
import { FormContext } from "../context/FormContext";
import useCompanyData from "../hooks/useCompanyData";
import useEmployeeData from "../hooks/useEmployeeData";
import useContractorData from "../hooks/useContractorData";
import { saveAnnualReturn } from "../services/apiService";

import CompanySelector from "../component/CompanySelector";
import YearSelector from "../component/YearSelector";
import CompanyInfo from "../component/CompanyInfo";
import EmployeeDetailsSection from "../component/EmployeeDetailsSection";
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

    const handleChange = (e, sectionPath = '') => {
    const { name, value } = e.target;

    // First handle the auto-calculation for employee totals
    if (name.includes('direct') || name.includes('contractor')) {
        setFormData(prev => {
            const newData = { ...prev };
            
            // Process the current field change first
            if (name.includes('[')) {
                // Handle array index paths (like 'accidentsTable[0].injuredInside')
                const pathParts = name.split('.');
                let ref = newData;
                
                for (let i = 0; i < pathParts.length; i++) {
                    const part = pathParts[i];
                    
                    if (part.includes('[')) {
                        const arrayName = part.split('[')[0];
                        const arrayIndex = part.match(/\[(\d+)\]/)[1];
                        
                        if (!ref[arrayName]) ref[arrayName] = [];
                        if (!ref[arrayName][arrayIndex]) ref[arrayName][arrayIndex] = {};
                        
                        ref = ref[arrayName][arrayIndex];
                    } else {
                        if (!ref[part]) ref[part] = {};
                        ref = ref[part];
                    }
                }
                
                const lastKey = pathParts[pathParts.length - 1].split('[')[0];
                ref[lastKey] = value;
            }
            else if (sectionPath) {
                // Handle regular paths with sectionPath
                const keys = sectionPath.split('.');
                let ref = newData;

                for (let i = 0; i < keys.length; i++) {
                    if (!ref[keys[i]]) ref[keys[i]] = {};
                    ref = ref[keys[i]];
                }

                ref[name] = value;
            } else {
                // Handle direct top-level changes
                newData[name] = value;
            }

            // Now calculate the totals
            return {
                ...newData,
                directTotal: Number(
                    Number(newData.directSkilled || 0)
                ),
                contractorTotal: Number(
                    Number(newData.contractorSkilled || 0)
                ),
                totalWorkers: Number(
                    Number(newData.directTotal || 0) + 
                    Number(newData.contractorTotal || 0)
                ),
                totalMales: Number(
                    Number(newData.directMale || 0) + 
                    Number(newData.contractorMale || 0)
                ),
                totalFemales: Number(
                    Number(newData.directFemale || 0) + 
                    Number(newData.contractorFemale || 0)
                ),
            };
        });
        return;
    }

    // Handle all other cases (non-employee fields)
    setFormData((prev) => {        
        // Handle array paths (like 'accidentsTable[0].injuredInside')
        const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
        
        // Determine the target path
        let targetPath;
        if (name.includes('[')) {
            // Handle array paths (e.g., 'accidentsTable[0].injuredInside')
            targetPath = sectionPath ? `${sectionPath}.${name}` : name;
        } else {
            targetPath = sectionPath ? `${sectionPath}.${name}` : name;
        }


        // Split the path into parts
        const pathParts = targetPath.split(/[\.\[\]]+/).filter(Boolean);
        let current = newData;

        // Navigate to the target object
        for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            
            // Handle array indices
            if (!isNaN(pathParts[i + 1])) {
                if (!current[part]) current[part] = [];
                const index = parseInt(pathParts[i + 1]);
                if (!current[part][index]) current[part][index] = {};
                current = current[part][index];
                i++; // Skip the index part
            } else {
                if (!current[part]) current[part] = {};
                current = current[part];
            }
        }
        
        // set values
        const lastKey = pathParts[pathParts.length - 1];
        // current[lastKey] = isNaN(value) ? value : Number(value);
        current[lastKey] = e.target.type === 'number' ? value : value;



        return newData;
    });
};


    // ✅ Multi-Step Form Steps with scoped change handlers
    const steps = [
        <CompanyInfo formData={formData?.companyInfo} handleChange={(e) => handleChange(e, "companyInfo")} />,
        <EmployeeDetailsSection formData={formData?.employeeDetails} handleChange={(e) => handleChange(e, "employeeDetails")} />,
        <PartA formData={formData?.partA} handleChange={(e) => handleChange(e, "partA")} />,
        <PartB formData={formData?.partB} handleChange={(e) => handleChange(e, "partB")} />,
        <PartC formData={formData?.partC} handleChange={(e) => handleChange(e, "partC")} />,
        <YearlyReturn formData={formData?.yearlyReturn} handleChange={(e) => handleChange(e, "yearlyReturn")} />,
        <PartD_A formData={formData?.partD?.partD_A} handleChange={(e) => handleChange(e, "partD.partD_A")} />,
        <PartD_B formData={formData?.partD?.partD_B} handleChange={(e) => handleChange(e, "partD.partD_B")} />,
        <PartD_CDE formData={formData?.partD?.partD_CDE} handleChange={(e) => handleChange(e, "partD.partD_CDE")} />,
        <PartD_F formData={formData?.partD?.partD_F} handleChange={(e) => handleChange(e, "partD.partD_F")} />,
        <PartD_G formData={formData?.partD?.partD_G} handleChange={(e) => handleChange(e, "partD.partD_G")} />,
        <PartD_H formData={formData?.partD?.partD_H} handleChange={(e) => handleChange(e, "partD.partD_H")} />,
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const submitForm = async () => {
        try {
            console.log("📌 Form Data Before Saving:", formData);
            await saveAnnualReturn(selectedCompanyId, selectedYear, formData);
            alert("Annual Return Saved Successfully!");
        } catch (error) {
            console.error("Save error:", error);
            alert("Failed to Save Annual Return");
        }
    };

    return (
        <div className="form-container">
            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
            </div>

            {/* Input Selectors */}
            <div className="take-input">
                <CompanySelector onSelect={setSelectedCompanyId} />
                <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            </div>

            {/* Render Current Step */}
            <div className="form-step">{steps[currentStep]}</div>

            {/* Navigation Buttons */}
            <div className="form-navigation">
                {currentStep > 0 && <button onClick={prevStep} className="btn btn-secondary">Previous</button>}
                {currentStep < steps.length - 1 && <button onClick={nextStep} className="btn btn-primary">Next</button>}
                {currentStep === steps.length - 1 && <button onClick={submitForm} className="btn btn-primary">Submit</button>}
            </div>
        </div>
    );
};

export default AnnualReturn;

