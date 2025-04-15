
// module.exports = router;
const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const { Op, QueryTypes } = require("sequelize"); // ✅ Import QueryTypes
const sequelize = require("../config/database"); // ✅ Import sequelize instance
const Employee = require("../model/Employee");

const router = express.Router();

// Multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Read Excel file
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Insert into Employee table
        const employees = await Employee.bulkCreate(sheetData, { ignoreDuplicates: true });

        res.status(200).json({ message: "Employees inserted successfully", data: employees });
    } catch (error) {
        console.error("❌ Error uploading file:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { company_id } = req.query;

        let employees;
        if (company_id) {
            // ✅ Using Sequelize ORM instead of raw query
            employees = await Employee.findAll({ where: { company_id } });
        } else {
            employees = await Employee.findAll();
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error("❌ Error fetching employees:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

/**
 * @route  GET /api/employees/by-company
 * @desc   Fetch employees by company_id (Alternative way using raw SQL)
 */
router.get("/by-company", async (req, res) => {
    try {
        const { company_id } = req.query;

        if (!company_id) {
            return res.status(400).json({ error: "Company ID is required" });
        }

        // ✅ Using raw SQL query with Sequelize safely
        const employees = await sequelize.query(
            "SELECT * FROM employees WHERE company_id = :companyId",
            { replacements: { companyId: company_id }, type: QueryTypes.SELECT }
        );

        res.status(200).json(employees);
    } catch (error) {
        console.error("❌ Error fetching employees:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.get("/employees", async (req, res) => {
    try {
        // Fetch employees with joining and exit dates
        const employees = await Employee.findAll({
            attributes: ["date_of_joining", "exit_date"]
        });

        let yearlyCounts = {}; // Store cumulative employee count per year

        employees.forEach((employee) => {
            const joiningYear = new Date(employee.date_of_joining).getFullYear();
            const exitYear = employee.exit_date ? new Date(employee.exit_date).getFullYear() : new Date().getFullYear();

            for (let year = joiningYear; year <= exitYear; year++) {
                yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
            }
        });

        // Convert to array format
        const chartData = Object.keys(yearlyCounts)
            .sort((a, b) => a - b)
            .map((year) => ({ year: parseInt(year), count: yearlyCounts[year] }));

        // ✅ Log the output in the console
        console.log("📊 Yearly Employee Count Data:", chartData);

        res.json(chartData);
    } catch (error) {
        console.error("❌ Error fetching employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
