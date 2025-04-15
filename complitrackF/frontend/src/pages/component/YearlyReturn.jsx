import React from "react";

const YearlyReturn = ({ formData, handleChange }) => {
    return (
        <div className="yearly-return-contractor">
            <div className="form-group">
                <label>Do you want to submit a Yearly Return?</label>
                <select
                    name="showYearlyReturn"
                    value={formData.showYearlyReturn || "No"}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded-md w-40"
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {/* ✅ Show the form only if user selects "Yes" */}
            {formData.showYearlyReturn === "Yes" && (
                <>
                    <div className="form-header">
                        <p>YEARLY RETURN to be submitted by the Contractors employing more than 9 workers.</p>
                    </div>

                    <div className="form-group">
                        <label>1. Duration of Contract</label>
                        <input
                            type="text"
                            name="contractDuration"
                            value={formData.contractDuration || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Number of days worked during the year:</label>
                        <input
                            type="number"
                            name="daysWorked"
                            value={formData.daysWorked || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>2. Average number of contract labour worked on any day during the year.</label>
                        <input
                            type="number"
                            name="averageContractLabour"
                            value={formData.averageContractLabour || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>3. Details of</label>
                    </div>

                    <div className="form-group">
                        <label>(a) Working hours:</label>
                        <input
                            type="text"
                            name="workingHours"
                            value={formData.workingHours || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>(b) Overtime work:</label>
                        <input
                            type="text"
                            name="overtimeWork"
                            value={formData.overtimeWork || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>(c) Weekly holiday:</label>
                        <input
                            type="text"
                            name="weeklyHoliday"
                            value={formData.weeklyHoliday || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>(d) Spread over:</label>
                        <input
                            type="text"
                            name="spreadOver"
                            value={formData.spreadOver || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>(e) Weekly holiday paid or not:</label>
                        <input
                            type="text"
                            name="weeklyHolidayPaid"
                            value={formData.weeklyHolidayPaid || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>4. Number of mandays worked during year</label>
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Male</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Female</th>
                                <th style={{ border: "1px solid black", padding: "8px" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: "1px solid black", padding: "8px" }}>
                                    <input
                                        type="number"
                                        style={{ width: "100%", border: "none" }}
                                        name="maleManDays"
                                        value={formData.maleManDays || ""}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>
                                    <input
                                        type="number"
                                        style={{ width: "100%", border: "none" }}
                                        name="femaleManDays"
                                        value={formData.femaleManDays || ""}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>
                                    <input
                                        type="number"
                                        style={{ width: "100%", border: "none" }}
                                        name="totalManDays"
                                        value={formData.totalManDays || ""}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="form-group">
                        <label>5. Amount of wages paid:</label>
                        <input
                            type="text"
                            name="wagesPaid"
                            value={formData.wagesPaid || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>6. Amount of deduction from wages:</label>
                        <input
                            type="text"
                            name="wageDeductions"
                            value={formData.wageDeductions || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>7. The following has been provided?</label>
                    </div>

                    {["Canteen", "Rest rooms", "Drinking water", "Creches", "First aid"].map((facility) => (
                        <div key={facility} className="form-group mb-3">
                            <label className="font-medium">{facility}</label>
                            <select
                                name={facility.replace(/\s/g, "").toLowerCase()}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-md w-40"
                                value={formData[facility.replace(/\s/g, "").toLowerCase()] || "Yes"}
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Nill">Nill</option>
                            </select>
                            <br /><br />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default YearlyReturn;
