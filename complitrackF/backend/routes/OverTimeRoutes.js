const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs-extra");
const path = require("path");
const pdf = require("html-pdf");
const ejs = require("ejs");
const OverTime = require("../model/OverTime");
const Employee = require("../model/Employee");
const Company = require("../model/Company");

const router = express.Router();

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload and insert Excel data
router.post("/upload-overtime", upload.single("file"), async (req, res) => {
    try {
        const { month } = req.body; // Get month from frontend

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        if (!month) {
            return res.status(400).json({ error: "Month is required" });
        }

        // Read uploaded Excel file
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Get first sheet
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Process each row and insert into the database
        const overtimeRecords = data.map(row => {
            const normalEarning = parseFloat(row["Normal Earning"]) || 0;
            const overtimeEarning = parseFloat(row["Overtime Earning"]) || 0;

            return {
                company_id: row["Company ID"],
                employee_id: row["Employee ID"],
                month, // Using month from frontend
                date: row["Date"],
                daily_hours: parseFloat(row["Daily Hours"]) || 0,
                weekly_hours: parseFloat(row["Weekly Hours"]) || 0,
                additional_production: parseFloat(row["Additional Production"]) || 0,
                overtime_hours: parseFloat(row["Overtime Hours"]) || 0,
                total_overtime_hours: parseFloat(row["Total Overtime Hours"]) || 0,
                normal_rate_per_hour: parseFloat(row["Normal Rate Per Hour"]) || 0,
                overtime_rate_per_hour: parseFloat(row["Overtime Rate Per Hour"]) || 0,
                normal_rate_per_piece: parseFloat(row["Normal Rate Per Piece"]) || 0,
                overtime_rate_per_piece: parseFloat(row["Overtime Rate Per Piece"]) || 0,
                normal_earning: normalEarning,
                overtime_earning: overtimeEarning,
                total_earning: (normalEarning + overtimeEarning).toFixed(2), // Calculated field
                overtime_pay_date: row["Overtime Pay Date"]
            };
        });

        // Insert into database
        await OverTime.bulkCreate(overtimeRecords);

        res.json({ message: "Data uploaded successfully", recordsInserted: overtimeRecords.length });

    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/", async (req, res) => {
    try {
        const overtimeRecords = await OverTime.findAll();
        res.json(overtimeRecords);
    } catch (error) {
        console.error("Error fetching overtime data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




router.get("/generate-pdf", async (req, res) => {
    try {
        const { company_id, month_year } = req.query;

        if (!company_id || !month_year) {
            return res.status(400).json({ error: "Company ID and Month-Year are required" });
        }

        // ✅ Fetch Company Details
        const company = await Company.findOne({ where: { company_id } });
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        // ✅ Fetch Overtime Records
        const overtimeRecords = await OverTime.findAll({ where: { company_id, month: month_year } });

        if (overtimeRecords.length === 0) {
            return res.status(404).json({ error: "No overtime records found for the given month and company" });
        }

        // ✅ Fetch Employee Details Directly
        const employees = await Employee.findAll({
            where: { employee_id: overtimeRecords.map(record => record.employee_id) },
            attributes: ["employee_id", "first_name", "department"]
        });

        // ✅ Convert Employees into Lookup Object
        const employeeMap = {};
        employees.forEach(emp => {
            employeeMap[emp.employee_id] = emp;
        });

        // ✅ Render EJS Template with Separate Employee Data
        const htmlContent = await ejs.renderFile(path.join(__dirname, "../views/overtime_pdf.ejs"), {
            company,
            month: month_year,
            records: overtimeRecords,
            employees: employeeMap // Pass Employees Separately
        });

        // ✅ Generate PDF
        const pdfPath = path.join(__dirname, "../public/pdfs/overtime_report.pdf");
        await fs.ensureDir(path.dirname(pdfPath));

        pdf.create(htmlContent, { format: "A4", orientation: "landscape" }).toFile(pdfPath, (err) => {
            if (err) {
                console.error("PDF Generation Error:", err);
                return res.status(500).json({ error: "Failed to generate PDF" });
            }
            res.json({ pdfUrl: `/pdfs/overtime_report.pdf` });
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;
