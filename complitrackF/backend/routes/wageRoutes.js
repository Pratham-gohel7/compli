const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const Wage = require("../model/Wage");
const Employee = require("../model/Employee");

const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🟢 API: Fetch all wage data
router.get("/", async (req, res) => {
    try {
        const wages = await Wage.findAll({
            include: [{ model: Employee, as: "employee", attributes: ["employee_id", "first_name"] }],
        });
        res.json(wages);
    } catch (error) {
        console.error("Error fetching wages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🟢 API: Upload Excel file & insert data into DB
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        // Parse Excel file
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Insert data into database
        const wageRecords = data.map(row => {
            const total_deductions =
                (row["PF Deduction"] || 0) +
                (row["ESI Deduction"] || 0) +
                (row["PT Deduction"] || 0) +
                (row["LWF Deduction"] || 0) +
                (row["Income Tax"] || 0) +
                (row["Advance Deduction"] || 0);

            const gross_salary =
                (row["Basic Salary"] || 0) +
                (row["HRA"] || 0) +
                (row["DA"] || 0) +
                (row["Other Allowances"] || 0) +
                (row["Bonus"] || 0);

            const net_salary = gross_salary - total_deductions;

            return {
                employee_id: row["Employee ID"],
                basic_salary: row["Basic Salary"] || 0,
                hra: row["HRA"] || 0,
                da: row["DA"] || 0,
                other_allowances: row["Other Allowances"] || 0,
                pf_deduction: row["PF Deduction"] || 0,
                esi_deduction: row["ESI Deduction"] || 0,
                pt_deduction: row["PT Deduction"] || 0,
                lwf_deduction: row["LWF Deduction"] || 0,
                income_tax: row["Income Tax"] || 0,
                advance_deduction: row["Advance Deduction"] || 0,
                bonus: row["Bonus"] || 0,
                gratuity_eligibility: row["Gratuity Eligibility"] === "Yes",
                gratuity_amount: row["Gratuity Amount"] || 0,
                payment_date: row["Payment Date"],
                total_deductions,
                net_salary
            };
        });

        await Wage.bulkCreate(wageRecords);
        res.json({ message: "Wages inserted successfully!" });
    } catch (error) {
        console.error("Error processing Excel file:", error);
        res.status(500).json({ error: "Failed to process file" });
    }
});

module.exports = router;
