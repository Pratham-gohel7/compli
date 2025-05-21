// components/sections/CompanyInfo.jsx
import ContactTable from "./ContactTable";

const CompanyInfo = ({ formData, handleChange }) => {
    console.log(formData)
    return (
        <div>
            <br />
            <center>
                <label>Company Information</label>
            </center>

            <div className="form-group">
                <label>Establishment Name:</label>
                <input type="text" name="nameOfEstablishment" value={formData?.nameOfEstablishment || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Address:</label>
                <textarea name="address" value={formData?.address || ""} onChange={handleChange}></textarea>
            </div>

            {/* Establishment Contact */}
            <h3>Establishment Contact</h3>
            <ContactTable formData={formData} isEditingDisabled prefix="establishment"  handleChange={handleChange}/>

            {/* Employer */}
            <div className="form-group">
                <label>Employer Name:</label>
                <input type="text" name="employerName" value={formData?.employerName || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Employer Address:</label>
                <textarea name="employerAddress" value={formData?.employerAddress || ""} onChange={handleChange}></textarea>
            </div>

            <h3>Employer Contact</h3>
            <ContactTable formData={formData} isEditingDisabled prefix="employer" handleChange={handleChange}/>

            {/* Manager */}
            <div className="form-group">
                <label>Manager Name:</label>
                <input type="text" name="managerName" value={formData?.managerName || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Manager Address:</label>
                <textarea name="managerAddress" value={formData?.managerAddress || ""} onChange={handleChange}></textarea>
            </div>

            <h3>Manager Contact</h3>
            <ContactTable formData={formData} isEditingDisabled prefix="manager" handleChange={handleChange}/>

            {/* Registration & Industry */}
            <div className="form-group">
                <label>Registration No:</label>
                <input type="text" name="registrationNo" value={formData?.registrationNo || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Nature of Industry:</label>
                <input type="text" name="industryType" value={formData?.industryType || ""} onChange={handleChange} />
            </div>
        </div>
    );
};

export default CompanyInfo;
