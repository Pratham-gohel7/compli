const ContactTable = ({ formData, isEditingDisabled, prefix, handleChange }) => {
    return (
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Tele. No.</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Mobile No.</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Fax No.</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Email Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                        <input
                            type="text"
                            name={`${prefix}TeleNo`}
                            value={formData?.[`${prefix}TeleNo`]}
                            onChange={(e) => handleChange(e, "companyInfo")}
                            
                        />
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                        <input
                            type="text"
                            name={`${prefix}MobileNo`}
                            value={formData?.[`${prefix}MobileNo`]}
                            onChange={(e) => handleChange(e, "companyInfo")}
                            
                        />
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                        <input
                            type="text"
                            name={`${prefix}FaxNo`}
                            value={formData?.[`${prefix}FaxNo`]}
                            onChange={(e) => handleChange(e, "companyInfo")}
                            
                        />
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                        <input
                            type="email"
                            name={`${prefix}Email`}
                            value={formData?.[`${prefix}Email`]}
                            onChange={(e) => handleChange(e, "companyInfo")}
                            
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ContactTable;
