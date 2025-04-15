import React from "react";

const PartD_F = ({ handleChange }) => {
    return (
        <div className="p-4">
            {/* Section F - Compliance Status of Working Hours Provisions */}
            <div className="form-header mb-4">
                <p className="text-lg font-semibold">(F) Compliance Status of Working Hours Provisions</p>
            </div>

            {[{
                label: "(1) Compliance of provisions relating to working hours for adults i.e. 9 hours a day and 48 hours per week (Sec. 51 to 56 GFR 84 to 86)",
                name: "workingHoursCompliance"
            },
            {
                label: "(2) Whether notice of period of work displayed on notice board? (Sec. 61, GFR 87)",
                name: "noticePeriodDisplayed"
            }].map((item, index) => (
                <div key={index} className="form-group mb-3">
                    <label className="font-medium">{item.label}</label>
                    <select name={item.name} onChange={handleChange} className="border border-gray-300 p-2 rounded-md w-40" defaultValue="Yes">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Null">Null</option>
                    </select>
                </div>
            ))}

            {/* Shift Timings */}
            <div className="form-group mb-3">
                <label className="font-medium">(3) Shift Timings</label>
                {['first', 'second', 'third', 'general'].map((shift, index) => (
                    <div key={index} className="flex items-center gap-2 mt-2">
                        <span>{shift.charAt(0).toUpperCase() + shift.slice(1)} shift from</span>
                        <input type="time" name={`${shift}ShiftStart`} className="border border-gray-300 p-2 rounded-md w-32" onChange={handleChange} />
                        <span>to</span>
                        <input type="time" name={`${shift}ShiftEnd`} className="border border-gray-300 p-2 rounded-md w-32" onChange={handleChange} />
                    </div>
                ))}
            </div>

            {[{
                label: "(4a) Normal working time for women workers: 8 hours",
                subLabel: "In case of relaxation granted for working hours of women workers, whether return & transport and security facilities provided. (GFR 91-A)",
                name: "womenWorkingHoursRelaxation"
            },
            {
                label: "(4b) Whether certificates of fitness are obtained for employment of young persons (above 14 yrs) in the prescribed Form No.5 (Sec.69)",
                name: "certificatesOfFitness"
            }].map((item, index) => (
                <div key={index} className="form-group mb-3">
                    <label className="font-medium">{item.label}</label>
                    {item.subLabel && <label className="text-sm">{item.subLabel}</label>}
                    <select name={item.name} onChange={handleChange} className="border border-gray-300 p-2 rounded-md w-40" defaultValue="Yes">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Null">Null</option>
                    </select>
                </div>
            ))}
        </div>
    );
};

export default PartD_F;