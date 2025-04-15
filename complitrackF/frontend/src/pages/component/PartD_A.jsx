import React from "react";

const PartD_A = ({ formData, handleChange }) => {
    return (
        <div className="factory-certification-details">
            <div className="form-header">
                <p>Part - D(A)</p>
                <p>Details for self-certification under The Factories Act, 1948 and Rules made thereunder</p>
                <p>My factory is registered under The Factories Act, 1948 and provisions regarding Health, Safety, Welfare, etc., are complied with.</p>
                <br />
            </div>

            <div className="form-group">
                <label>Factory Identification Details</label>
                <input
                    type="text"
                    name="factoryIdentification"
                    value={formData?.factoryIdentification || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>NIC Code (Five Digit)</label>
                <input
                    type="text"
                    name="nicCode"
                    value={formData?.nicCode || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Sector (Public / Private / Co-operative / Joint Venture)</label>
                <input
                    type="text"
                    name="sector"
                    value={formData?.sector || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Registration under Section [2m(i), 2m(ii), /85]</label>
                <input
                    type="text"
                    name="registrationSection"
                    value={formData?.registrationSection || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Registration No</label>
                <input
                    type="text"
                    name="registrationNo"
                    value={formData?.registrationNo || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>License No</label>
                <input
                    type="text"
                    name="licenseNo"
                    value={formData?.licenseNo || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Licensed Workers</label>
                <input
                    type="text"
                    name="licensedWorkers"
                    value={formData?.licensedWorkers || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Licensed H.P</label>
                <input
                    type="text"
                    name="licensedHP"
                    value={formData?.licensedHP || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>License Renewal Position (Year)</label>
                <input
                    type="text"
                    name="licenseRenewalYear"
                    value={formData?.licenseRenewalYear || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>License Renewal Application Submitted for the Year</label>
                <input
                    type="text"
                    name="licenseRenewalApplicationYear"
                    value={formData?.licenseRenewalApplicationYear || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Plan Approval No:</label>
                <input
                    type="text"
                    name="planApprovalNo"
                    value={formData?.planApprovalNo || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Finished Products</label>
                <input
                    type="text"
                    name="finishedProducts"
                    value={formData?.finishedProducts || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Intermediates</label>
                <input
                    type="text"
                    name="intermediates"
                    value={formData?.intermediates || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Raw Materials</label>
                <input
                    type="text"
                    name="rawMaterials"
                    value={formData?.rawMaterials || ""}
                    onChange={handleChange}
                />
                <br /><br />
            </div>
        </div>
    );
};

export default PartD_A;
