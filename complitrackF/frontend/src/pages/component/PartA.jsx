const PartA = ({ formData, handleChange }) => {
    return (
        <div>
            <div className="form-header">
                <br /><br />
                <label>Part - A</label>
            </div>

            <div className="form-group">
                <label>Number of days the establishment/factory worked in the year:</label>
                <input type="number" name="totalWorkingDays" value={formData?.totalWorkingDays || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Number of man days worked in the year:</label>
                <input type="number" name="totalManDays" value={formData?.totalManDays || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Number of average employees employed in the year:</label>
                <input type="number" name="avgEmployees" value={formData?.avgEmployees || ""} onChange={handleChange} />
            </div>

            {/* <div className="form-group">
                <label>Total wages paid category-wise:</label>
                <input type="text" name="totalWages" value={formData?.totalWages || ""} onChange={handleChange} />
            </div> */}
            <div className="form-group">
                <label>Total wages paid category-wise: man</label>
                <input type="number" name="totalWagesMan" value={formData?.totalWagesMan || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Total wages paid category-wise: women</label>
                <input type="number" name="totalWagesWomen" value={formData?.totalWagesWomen || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Total Fine Imposed, if any:</label>
                <input type="number" name="totalFine" value={formData?.totalFine || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Other deductions, if any:</label>
                <input type="text" name="otherDeductions" value={formData?.otherDeductions || ""} onChange={handleChange} />
                <br /><br />
            </div>
        </div>
    );
};

export default PartA;
