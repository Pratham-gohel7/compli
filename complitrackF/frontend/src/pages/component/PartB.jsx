import React from "react";

const PartB = ({ formData, handleChange }) => {
    return (
        <div className="bonus-details">
            <div className="form-header">
                <p>Part - B</p>
            </div>

            <div className="form-group">
                <label>Percentage of bonus paid</label>
                <input
                    type="text"
                    name="bonusPercentage"
                    value={formData?.bonusPercentage || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Number of beneficiaries</label>
                <input
                    type="text"
                    name="bonusBeneficiaries"
                    value={formData?.bonusBeneficiaries || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Total amount of bonus paid</label>
                <input
                    type="text"
                    name="totalBonusPaid"
                    value={formData?.totalBonusPaid || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Date of payment</label>
                <input
                    type="date"
                    name="bonusPaymentDate"
                    value={formData?.bonusPaymentDate || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>If bonus is not paid, reason thereof</label>
                <input
                    type="text"
                    name="bonusNotPaidReason"
                    value={formData?.bonusNotPaidReason || ""}
                    onChange={handleChange}
                />
                <br /><br />
            </div>
        </div>
    );
};

export default PartB;
