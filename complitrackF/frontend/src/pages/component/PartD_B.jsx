import React, { useEffect } from "react";

const PartD_B = ({ formData, handleChange }) => {
    useEffect(() => {
        const totalAdult = Number(formData.adultMale || 0) + Number(formData.adultFemale || 0);
        if (formData.adultTotal !== totalAdult) {
          handleChange({ target: { name: "adultTotal", value: totalAdult } });
        }

        const totalAdolescent = Number(formData.adolescentMale || 0) + Number(formData.adolescentFemale || 0);
        if (formData.adolescentTotal !== totalAdolescent) {
          handleChange({ target: { name: "adolescentTotal", value: totalAdolescent } });
        }
    }, [formData.adultMale, formData.adultFemale, formData.adolescentMale, formData.adolescentFemale])

    return (
        <div className="part-d-b">
            <div className="form-header">
                <p>(B) : Details of Employment</p>
            </div>

            {/* Average Daily Workers */}
            <div className="form-group">
                <label>Average Daily Workers:</label>
            </div>
            <div className="form-group">
                <label>Male</label>
                <input type="number" name="averageDailyMale" value={formData?.averageDailyMale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Female</label>
                <input type="number" name="averageDailyFemale" value={formData?.averageDailyFemale || ""} onChange={handleChange} />
            </div>

            {/* Number of Days Worked */}
            <div className="form-group">
                <label>Number of days the factory worked during the previous year:</label>
                <input type="number" name="daysWorked" value={formData?.daysWorked || ""} onChange={handleChange} />
            </div>

            {/* Man-Days Worked */}
            <div className="form-group">
                <label>Number of man-days worked (i.e. aggregate attendance during the previous year)</label>
                <input type="number" name="manDaysWorked" value={formData?.manDaysWorked || ""} onChange={handleChange} />
            </div>

            {/* Adults */}
            <div className="form-group">
                <label>Adults:</label>
            </div>
            <div className="form-group">
                <label>Male</label>
                <input type="number" name="adultMale" value={formData?.adultMale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Female</label>
                <input type="number" name="adultFemale" value={formData?.adultFemale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Total</label>
                <input type="number" name="adultTotal" value={formData?.adultTotal || ""} onChange={handleChange} />
            </div>

            {/* Adolescents */}
            <div className="form-group">
                <label>Adolescents:</label>
            </div>
            <div className="form-group">
                <label>Male</label>
                <input type="number" name="adolescentMale" value={formData?.adolescentMale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Female</label>
                <input type="number" name="adolescentFemale" value={formData?.adolescentFemale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Total</label>
                <input type="number" name="adolescentTotal" value={formData?.adolescentTotal || ""} onChange={handleChange} />
            </div>

            {/* Man-Hours Worked */}
            <div className="form-group">
                <label>Total number of man-hours worked including overtime but excluding rest interval:</label>
                <input type="number" name="totalManHoursWorked" value={formData?.totalManHoursWorked || ""} onChange={handleChange} />
            </div>
        </div>
    );
};

export default PartD_B;
