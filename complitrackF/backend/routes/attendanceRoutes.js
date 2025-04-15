const express = require("express");
const { Op, Sequelize } = require("sequelize");
const multer = require("multer");
const xlsx = require("xlsx");
const Attendance = require("../model/Attendance");
const Employee = require("../model/Employee");
const Company = require("../model/Company");
// const  = require("sequelize");

const router = express.Router();

// Set up Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route POST /api/attendance/upload
 * @desc Upload an Excel file and insert data into the database
 */
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read Excel file from buffer
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (const row of sheetData) {
            const employee = await Employee.findOne({ where: { employee_id: row.employee_id } });
            if (!employee) {
                console.warn(`Skipping entry: Employee ID ${row.employee_id} not found`);
                continue;
            }

            // Validate month-year format (MM-YYYY)
            const monthYearRegex = /^\d{2}-\d{4}$/;
            if (!monthYearRegex.test(row.month_year)) {
                console.warn(`Skipping entry: Invalid month-year format for ${row.employee_id}`);
                continue;
            }

            // Get the total days in the given month
            const [month, year] = row.month_year.split("-").map(Number);
            const daysInMonth = new Date(year, month, 0).getDate();

            // Process attendance days dynamically (skip invalid days)
            let presentDays = 0;
            let absentDays = 0;
            let attendanceDays = {};

            for (let i = 1; i <= daysInMonth; i++) {
                const dayKey = `day_${i}`;
                const value = row[dayKey] || ""; // Default empty if not provided

                if (value === "P") presentDays++;
                if (value === "A") absentDays++;
                attendanceDays[dayKey] = value;
            }

            // Calculate leave values from Excel file
            const casualLeave = row.casual_leave || 0;
            const sickLeave = row.sick_leave || 0;
            const privilegeLeave = row.privilege_leave || 0;
            const leaveWithPay = casualLeave + sickLeave + privilegeLeave;
            const leaveWithoutPay = Math.max(absentDays - leaveWithPay, 0);

            // Compute totals
            const total_14_to_19 =
                (row.strike || 0) +
                (row.layoff || 0) +
                (row.lockout || 0) +
                leaveWithPay +
                leaveWithoutPay +
                (row.any_other_reason || 0);
            const totalMandaysPaidFor = presentDays + leaveWithPay;

            // Create attendance record
            await Attendance.create({
                employee_id: row.employee_id,
                company_id: row.company_id,
                month_year: row.month_year,
                strike: row.strike || 0,
                layoff: row.layoff || 0,
                lockout: row.lockout || 0,
                casual_leave: casualLeave,
                sick_leave: sickLeave,
                privilege_leave: privilegeLeave,
                leave_with_pay: leaveWithPay,
                leave_without_pay: leaveWithoutPay,
                any_other_reason: row.any_other_reason || 0,
                number_festival_national_holidays: row.number_festival_national_holidays || 0,
                number_weekly_holidays_off_paid: row.number_weekly_holidays_off_paid || 0,
                total_mandays_worked: presentDays,
                total_14_to_19: total_14_to_19,
                total_mandays_paid_for: totalMandaysPaidFor,
                ...attendanceDays, // Insert attendance days dynamically
            });
        }

        res.json({ message: "Attendance data uploaded successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @route GET /api/attendance
 * @desc Fetch all attendance records
 */
// router.get("/", async (req, res) => {
//     try {
//         const records = await Attendance.findAll({
//             include: [
//                 {
//                     model: Employee,
//                     as: "employee",
//                     attributes: [
//                         "first_name",
//                         "last_name",
//                         "father_husbandname",
//                         "date_of_joining",
//                         "designation",
//                         "alphabet_assigned",
//                         "number_of_relay",
//                         "certificate_number_date",
//                         "section_68_token_number",
//                     ],
//                 },
//                 { model: Company, as: "company", attributes: ["company_name"] },
//             ],
//         });
//         res.json(records);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
router.get("/", async (req, res) => {
    try {
        const attendanceRecords = await Attendance.findAll();
        res.json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/fetch", async (req, res) => {
    try {
        const { company_id, month_year } = req.query;

        console.log(`Fetching attendance for Company: ${company_id}, Month-Year: ${month_year}`);

        if (!company_id || !month_year) {
            return res.status(400).json({ error: "Company ID and Month-Year are required" });
        }

        const attendanceRecords = await Attendance.findAll({
            where: { company_id, month_year },
            include: [
                {
                    model: Employee,
                    attributes: [
                        "first_name",
                        "last_name",
                        "father_husbandname",
                        "date_of_joining",
                        "designation",
                        "alphabet_assigned",
                        "number_of_relay",
                        "certificate_number_date",
                        "section_68_token_number"
                    ]
                }
            ]
        });

        // console.log("Fetched Attendance Records:", attendanceRecords);
        res.json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.get("/total-mandays/:company_id", async (req, res) => {
    try {
        const companyId = req.params.company_id;
        const { year } = req.query; // Get year from query parameters

        if (!year) {
            return res.status(400).json({ error: "Year is required" });
        }

        const totalManDays = await Attendance.sum("total_mandays_worked", {
            where: {
                company_id: companyId,
                month_year: { [Op.like]: `%${year}` } // Filter by selected year
            }
        });

        res.json({ totalManDays: totalManDays || 0 }); // Return 0 if no records
    } catch (error) {
        console.error("❌ Error fetching total man-days:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/total-gender/:company_id", async (req, res) => {
    try {
        const companyId = req.params.company_id;

        // 🔹 Count unique male employees (`M`) who have attendance records
        const totalMales = await Attendance.count({
            distinct: true,  // Ensures unique employee count
            col: "employee_id",
            include: [{
                model: Employee,
                where: { company_id: companyId, sex: "m" }
            }]
        });

        // 🔹 Count unique female employees (`F`) who have attendance records
        const totalFemales = await Attendance.count({
            distinct: true, // Ensures unique employee count
            col: "employee_id",
            include: [{
                model: Employee,
                where: { company_id: companyId, sex: "f" }
            }]
        });

        // 🔹 Log results in the console
        console.log(`Total Unique Employees for Company ID: ${companyId}`);
        console.log(`Unique Males: ${totalMales}`);
        console.log(`Unique Females: ${totalFemales}`);

        res.json({ totalMales, totalFemales });
    } catch (error) {
        console.error("Error fetching gender-based attendance:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/employees/:company_id", async (req, res) => {
    try {
        const { company_id } = req.params;
        const { year } = req.query; // Get year from query parameters

        if (!year) {
            return res.status(400).json({ error: "Year is required" });
        }

        // Adjust filtering logic for MMYYYY format
        const whereClause = {
            company_id,
            [Op.and]: [
                Sequelize.where(
                    Sequelize.fn("RIGHT", Sequelize.col("month_year"), 4), // Extract last 4 digits (YYYY)
                    year
                )
            ]
        };

        // Get total unique employees who had attendance in the given year
        const totalDirectEmployees = await Attendance.count({
            distinct: true,
            col: "employee_id",
            where: whereClause
        });

        // Get total unique male employees
        const maleDirect = await Attendance.count({
            distinct: true,
            col: "employee_id",
            where: whereClause,
            include: [{
                model: Employee,
                required: true,
                where: { sex: "m" }
            }]
        });

        // Get total unique female employees
        const femaleDirect = await Attendance.count({
            distinct: true,
            col: "employee_id",
            where: whereClause,
            include: [{
                model: Employee,
                required: true,
                where: { sex: "f" }
            }]
        });

        console.log(`✅ Total Employees: ${totalDirectEmployees}`);
        console.log(`✅ Male Employees: ${maleDirect}`);
        console.log(`✅ Female Employees: ${femaleDirect}`);

        res.json({
            skilled: totalDirectEmployees,
            total: totalDirectEmployees,
            male: maleDirect,
            female: femaleDirect
        });

    } catch (error) {
        console.error("❌ Error fetching direct employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = router;
