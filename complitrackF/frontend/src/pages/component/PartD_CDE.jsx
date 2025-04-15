import React from "react";

const PartD_CDE = ({ formData, handleChange }) => {
    return (
        <div className="p-4">
            {/* Part C: Health Provisions */}
            <div className="form-header">
                <p>(C) Compliance Status for Health Provisions</p>
            </div>

            {[
                { label: "(1) Measures taken for prevention of dust/fumes generated in the process", name: "preventionMeasures" },
                { label: "(2) Provision of wholesome drinking water (Sec. 18, GFR 35 to 40)", name: "drinkingWater" },
                { label: "(3) Provision of Urinals, Latrines & Bathrooms facilities separately for men and women (Sec. 19, GFR 41 to 50)", name: "urinalsAndLatrines" },
                { label: "(4) Maintenance of health records in Form No. 20, 32 & 33 (GFR 15, 68 T)", name: "healthRecords" },
                { label: "(5) Provision of Occupational Health Center (GFR 68 U)", name: "occupationalHealthCenter" },
                { label: "(6) Provision of Factory Medical Officer (Retainership/Part-time/Full-time) (GFR 68 U)", name: "medicalOfficer" },
                { label: "(7) Number of Industrial Hygienists employed to monitor work environment (Sec. 7-A, 112)", name: "industrialHygienists" },
            ].map((item, index) => (
                <div key={index} className="form-group mb-3">
                    <label className="font-medium">{item.label}</label>
                    <select 
                        name={item.name} 
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded-md w-40" 
                        value={formData?.[item.name] || "Yes"}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Null">Null</option>
                    </select>
                </div>
            ))}

            {/* Part D: Safety Provisions */}
            <div className="form-header mt-6">
                <p>(D) Compliance Status for Safety Provisions</p>
            </div>

            {[
                { label: "(1) Compliance of safety provisions prescribed under Schedules, including guarding of machinery (Sec.21, 22, GFR 54 & 102)", name: "safetyProvisions" },
                { label: "(2) Whether safe means of access provided to plants & machinery (Sec.32,33)", name: "safeAccess" },
                { label: "(3) Whether emergency fire exits provided (GFR 66A)", name: "fireExits" },
                { label: "(4) Details of fire fighting equipment including water storage capacity & trained personnel (GFR 66A & 102)", name: "fireFightingEquipment" },
                { label: "(5) Whether hoists, lifts, cranes, lifting tackles & lifting devices are certified duly by Competent Person in prescribed forms? (Sec.28, GFR 58, 59; Sec.29 GFR 60, 60A)", name: "hoistsLiftsCertified" },
                { label: "(6) Whether pressure vessels in use are tested by Competent Person & duly certified in prescribed form. (Sec.31, GFR 61, 61A)", name: "pressureVessels" },
                { label: "(7) Details of personal protective equipment provided and special safety equipment if any. (Sec.41, GFR 102 & 55-A)", name: "protectiveEquipments" },
                { label: "(8) Details of Safety Officers & Safety Supervisors (Sec.40 B GFR 68-H & 68-S)", name: "safetyOfficers" },
                { label: "(9) Safety Committee functioning? (if applicable) (GFR 68 F, 68 Y)", name: "safetyCommittee" },
                { label: "(10) Whether provisions of Chapter-IV A are complied with (if covered under Schedule-I framed under Sec.2cb) (Sec. 41B to 41H)", name: "chapterIV_A" },
                { label: "(11) Number of Safety programs for training & safety awareness arranged during last year and number of workers trained", name: "safetyTraining" },
            ].map((item, index) => (
                <div key={index} className="form-group mb-3">
                    <label className="font-medium">{item.label}</label>
                    <select 
                        name={item.name} 
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded-md w-40" 
                        value={formData?.[item.name] || "Yes"}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Null">Null</option>
                    </select>
                </div>
            ))}

            {/* Major Accident Hazard Factories Section */}
            <div className="form-header mt-6">
                <p>(12) For Major Accident Hazard Factories:</p>
            </div>

            {[
                { label: "(a) Onsite emergency plan prepared / amended date", name: "onsiteEmergencyPlan" },
                { label: "(b) Rehearsals done for Onsite Emergency Plan during last year (Give dates)", name: "rehearsalsDone" },
                { label: "(c) Details of Safety Policy, Safety Audit & Safety Report (if applicable) (GFR 68 .1, 68 O & 12 C)", name: "safetyPolicyAudit" },
                { label: "(d) Whether information regarding hazards and actions taken provided to public, workers and authorities (GFR 68 K, 68 L)", name: "hazardInformation" },
            ].map((item, index) => (
                <div key={index} className="form-group mb-3">
                    <label className="font-medium">{item.label}</label>
                    <select 
                        name={item.name} 
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded-md w-40" 
                        value={formData?.[item.name] || "Yes"}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Null">Null</option>
                    </select>
                </div>
            ))}

            {/* Part E: Welfare Provisions */}
            <div className="form-header mt-6">
                <p>(E) Compliance Status for Welfare Provisions</p>
            </div>

            {[
                { label: "(1) Whether first aid facilities are provided as per rules. (Sec. 45, GFR 70)", name: "firstAidFacilities" },
                { label: "(2) Provision of Ambulance Room, required staff, Ambulance Van (if applicable) (Sec.45, GFR 68 U, 68-V &71)", name: "ambulanceProvision" },
                { label: "(3a) Whether canteen facility provided as per standards prescribed if more than 250 workers are employed. (Sec. 46, GFR 72 to 78)", name: "canteenFacility" },
                { label: "(3b) Is canteen managed/run departmentally or through a contractor?", name: "canteenManaged", options: ["Run departmentally", "Through a contractor"] },
                { label: "(4) Whether Rest Room and Lunch Rooms are provided? If more than 150 workers are employed. (Sec. 47, GFR 79)", name: "restLunchRooms" },
                { label: "(5) Whether creche facilities are provided for the use of children of women employees? (if more than 30 women are employed) (Sec.48, GFR 80 to 83 A)", name: "crecheFacility" },
                { label: "(6) Whether Welfare Officer is appointed as per the provisions laid down (Sec.49)", name: "welfareOfficer" },
            ].map((item, index) => (
                <div key={index} className="form-group mb-3">
                    <label className="font-medium">{item.label}</label>
                    <select 
                        name={item.name} 
                        onChange={handleChange} 
                        className="border border-gray-300 p-2 rounded-md w-40" 
                        value={formData?.[item.name] || "Yes"}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Null">Null</option>
                    </select>
                </div>
            ))}
        </div>
    );
};

export default PartD_CDE;
