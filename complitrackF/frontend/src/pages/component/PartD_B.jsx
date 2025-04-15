import React from "react";

const PartD_B = ({ formData, handleChange }) => {
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
                <input type="text" name="daysWorked" value={formData?.daysWorked || ""} onChange={handleChange} />
            </div>

            {/* Man-Days Worked */}
            <div className="form-group">
                <label>Number of man-days worked (i.e. aggregate attendance during the previous year)</label>
                <input type="text" name="manDaysWorked" value={formData?.manDaysWorked || ""} onChange={handleChange} />
            </div>

            {/* Adults */}
            <div className="form-group">
                <label>Adults:</label>
            </div>
            <div className="form-group">
                <label>Male</label>
                <input type="text" name="adultMale" value={formData?.adultMale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Female</label>
                <input type="text" name="adultFemale" value={formData?.adultFemale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Total</label>
                <input type="text" name="adultTotal" value={formData?.adultTotal || ""} onChange={handleChange} />
            </div>

            {/* Adolescents */}
            <div className="form-group">
                <label>Adolescents:</label>
            </div>
            <div className="form-group">
                <label>Male</label>
                <input type="text" name="adolescentMale" value={formData?.adolescentMale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Female</label>
                <input type="text" name="adolescentFemale" value={formData?.adolescentFemale || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Total</label>
                <input type="text" name="adolescentTotal" value={formData?.adolescentTotal || ""} onChange={handleChange} />
            </div>

            {/* Man-Hours Worked */}
            <div className="form-group">
                <label>Total number of man-hours worked including overtime but excluding rest interval:</label>
                <input type="text" name="totalManHoursWorked" value={formData?.totalManHoursWorked || ""} onChange={handleChange} />
            </div>
        </div>
    );
};

export default PartD_B;
