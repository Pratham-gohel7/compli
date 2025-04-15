// components/common/YearSelector.jsx
import React from "react";

const YearSelector = ({ selectedYear, setSelectedYear }) => {
    return (
        <div className="form-group">
            <label>Select Year:</label>
            <select
                value={selectedYear || ""}  // ✅ Ensures empty selection initially
                onChange={(e) => setSelectedYear(e.target.value)}
            >
                <option value="" disabled>-- Select a Year --</option> {/* ✅ Forces selection */}
                {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                })}
            </select>
        </div>
    );
};

export default YearSelector;
