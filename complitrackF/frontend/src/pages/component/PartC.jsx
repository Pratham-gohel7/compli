import React, { useEffect } from "react";

const PartC = ({ formData, handleChange }) => {
    useEffect(() => {
        console.log("✅ Updated PartC formData:", formData);
    }, [formData]);

    return (
        <div className="contractor-details">
            <h3>Part - C: Contractor Details</h3>

            <div className="form-group">
                <label>Name and Postal Address of the Contractor</label>
                <input
                    type="text"
                    name="contractorNameAddress"
                    value={formData.contractorNameAddress || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Nature of Work/Operations of Contractor</label>
                <input
                    type="text"
                    name="contractorWorkNature"
                    value={formData.contractorWorkNature || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Total Number of Days During the Year on Which Contract Labour Was Employed</label>
                <input
                    type="number"
                    name="contractLabourDays"
                    value={formData.contractLabourDays || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Total Number of Man Days Worked During the Year by Contract Labour</label>
                <input
                    type="number"
                    name="contractManDaysWorked"
                    value={formData.contractManDaysWorked || ""}
                    onChange={handleChange}
                // disabled={isEditingDisabled}
                />
            </div>

            <div className="form-group">
                <label>Total Number of Days During the Year on Which Direct Labour Was Employed</label>
                <input
                    type="number"
                    name="directLabourDays"
                    value={formData.directLabourDays || ""}
                    onChange={handleChange}
                // disabled={isEditingDisabled}
                />
            </div>

            <div className="form-group">
                <label>Total Number of Man Days Worked by Direct Labour</label>
                <input
                    type="number"
                    name="directManDaysWorked"
                    value={formData.directManDaysWorked || ""}
                    onChange={handleChange}
                // disabled={isEditingDisabled}
                />
            </div>

            <div className="form-group">
                <label>Changes in Establishment Management, Location, or Other Details</label>
                <textarea
                    name="establishmentChanges"
                    value={formData.establishmentChanges || ""}
                    onChange={handleChange}
                // disabled={isEditingDisabled}
                />
            </div>
        </div>
    );
};

export default PartC;

