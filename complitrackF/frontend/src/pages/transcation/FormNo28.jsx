import React, { useState, useEffect } from "react";
import axios from "axios";

const FormNo28 = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedMonthYear, setSelectedMonthYear] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);

    // Fetch companies when component mounts
    useEffect(() => {
        axios.get("http://localhost:5001/api/companies")
            .then(response => setCompanies(response.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    // Handle company selection
    const handleCompanyChange = (event) => {
        setSelectedCompany(event.target.value);
    };

    // Handle month-year selection
    const handleMonthYearChange = (event) => {
        setSelectedMonthYear(event.target.value);
    };

    // Fetch attendance data based on selection
    const fetchAttendanceData = async () => {
        if (!selectedCompany || !selectedMonthYear) {
            alert("Please select both Company and Month-Year.");
            return;
        }

        // Convert "YYYY-MM" to "MM-YYYY"
        const [year, month] = selectedMonthYear.split("-");
        const formattedMonthYear = `${month}-${year}`;

        try {
            const response = await axios.get(
                `http://localhost:5001/api/attendance/fetch?company_id=${selectedCompany}&month_year=${formattedMonthYear}`
            );
            // console.log("Fetched Attendance Data:", response.data); // Debugging
            setAttendanceData(response.data);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };


    const handleSubmit = async () => {
        if (!attendanceData || attendanceData.length === 0) {
            alert("No attendance data to submit!");
            return;
        }

        // Format the data before sending it to the API
        const formattedData = attendanceData.map(record => ({
            company_id: selectedCompany,
            employee_id: record.employee_id,
            month_year: selectedMonthYear.split("-").reverse().join("-"), // Convert YYYY-MM to MM-YYYY
            serial_number_register: record.serial_number_register || "N/A",
            father_husbandname: record.employee?.father_husbandname || "N/A",
            date_of_appointment: record.employee?.date_of_joining || null,
            occupation: record.employee?.designation || "N/A",
            alphabet_assigned: record.employee?.alphabet_assigned || "N/A",
            number_of_relay: record.employee?.number_of_relay || 0,
            certificate_number_date: record.employee?.certificate_number_date || "N/A",
            section_68_token_number: record.employee?.section_68_token_number || "N/A",

            // Attendance Days (1-31)
            ...Object.fromEntries(
                [...Array(31).keys()].map(i => [`day_${i + 1}`, record[`day_${i + 1}`] || "-"])
            ),

            total_mandays_worked: [...Array(31).keys()].reduce(
                (count, i) => count + (record[`day_${i + 1}`] === "P" ? 1 : 0),
                0
            ),

            strike: record.strike || 0,
            layoff: record.layoff || 0,
            lockout: record.lockout || 0,
            leave_with_pay: record.leave_with_pay || 0,
            leave_without_pay: record.leave_without_pay || 0,
            any_other_reason: record.any_other_reason || 0,

            total_of_14_to_19:
                (record.strike || 0) + (record.layoff || 0) + (record.lockout || 0) +
                (record.leave_with_pay || 0) + (record.leave_without_pay || 0) + (record.any_other_reason || 0),

            number_festival_national_holidays: record.number_festival_national_holidays || 0,
            number_weekly_holidays_off_paid: record.number_weekly_holidays_off_paid || 0,
            total_mandays_paid_for: record.total_mandays_paid_for || 0,
            remarks: record.remarks || "N/A"
        }));

        try {
            const response = await axios.post("http://localhost:5001/api/form28", formattedData);
            alert("Data inserted successfully!");
            console.log("✅ Inserted Data:", response.data);
        } catch (error) {
            console.error("❌ Error inserting data:", error);
            alert("Error submitting data!");
        }
    };




    return (
        <div className="form-container">
            <h2>Form No. 28</h2>

            {/* Company Dropdown */}

            <div className="form-group">
                <label>Select Company:</label>
                <select value={selectedCompany} onChange={handleCompanyChange}>
                    <option value="">Select Company</option>
                    {companies.map(company => (
                        <option key={company.company_id} value={company.company_id}>
                            {company.company_name}
                        </option>
                    ))}
                </select>


            </div>

            {/* Month-Year Picker */}
            <label>Select Month-Year:</label>
            <input
                type="month"
                value={selectedMonthYear}
                onChange={handleMonthYearChange}
                style={{ width: "150px" }}
            />

            <button onClick={fetchAttendanceData} class="submit-btn" >Fetch Attendance</button>

            {/* Attendance Data Display */}
            <div className="table-container">
                <table className="table-data">
                    <thead>
                        <tr>
                            <th>Serial number in the Register of adult / child worker</th>
                            <th>Name of worker</th>
                            <th>Father’s / Husband’s name</th>
                            <th>Date of Appointment</th>
                            <th>Occupation</th>
                            <th>Alphabet Assigned</th>
                            <th>Number of relay If working In shift</th>
                            <th>Number & Date of Certificate</th>
                            <th>Token number under Section 68</th>
                            {[...Array(31).keys()].map(i => <th key={i}>Day {i + 1}</th>)}
                            <th>Total number of mandays pay worked</th>
                            <th>Strike</th>
                            <th>Lay off</th>
                            <th>Lockout</th>
                            <th>Leave with pay</th>
                            <th>Leave without pay</th>
                            <th>Any other reason</th>
                            <th>Total of 14 to Col. 19</th>
                            <th>Number of Festival & National Holiday</th>
                            <th>Number of Weekly Holidays (off) Paid for</th>
                            <th>Total mandays paid for *</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.length > 0 ? (
                            attendanceData.map((record, index) => {
                                console.log("Rendering record:", record);
                                return (
                                    <tr key={index}>
                                        <td>{record.employee_id}</td>
                                        <td>{record.employee?.first_name ? `${record.employee.first_name} ${record.employee.last_name || ""}` : "N/A"}</td>
                                        <td>{record.employee?.father_husbandname || "N/A"}</td>
                                        <td>{record.employee?.date_of_joining || "N/A"}</td>
                                        <td>{record.employee?.designation || "N/A"}</td>
                                        <td>{record.employee?.alphabet_assigned || "N/A"}</td>
                                        <td>{record.employee?.number_of_relay || "N/A"}</td>
                                        <td>{record.employee?.certificate_number_date || "N/A"}</td>
                                        <td>{record.employee?.section_68_token_number || "N/A"}</td>
                                        {[...Array(31).keys()].map((i) => (
                                            <td key={i}>{record[`day_${i + 1}`] || "-"}</td>
                                        ))}
                                        <td>
                                            {[...Array(31).keys()].reduce(
                                                (count, i) => count + (record[`day_${i + 1}`] === "P" ? 1 : 0),
                                                0
                                            )}
                                        </td>
                                        <td>{record.strike}</td>
                                        <td>{record.layoff}</td>
                                        <td>{record.lockout}</td>
                                        <td>{record.leave_with_pay}</td>
                                        <td>{record.leave_without_pay}</td>
                                        <td>{record.any_other_reason}</td>
                                        <td>
                                            {(record.strike || 0) + (record.layoff || 0) + (record.lockout || 0) + (record.leave_with_pay || 0) + (record.leave_without_pay || 0) + (record.any_other_reason || 0)}
                                        </td>
                                        <td>{record.number_festival_national_holidays}</td>
                                        <td>{record.number_weekly_holidays_off_paid}</td>
                                        <td>{record.total_mandays_paid_for}</td>
                                        <td>{record.remarks || "N/A"}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="24">No data available</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
            <button onClick={handleSubmit} className="submit-btn">Submit</button>
        </div>
    );
};

export default FormNo28;
