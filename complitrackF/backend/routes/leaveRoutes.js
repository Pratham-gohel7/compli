const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const LeaveRequest = require("../model/LeaveRequest");
const Employee = require("../model/Employee");

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Fetch all leave requests with employee details
router.get("/", async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.findAll({
            include: {
                model: Employee,
                as: "employee",
                attributes: ["first_name"],
            },
        });
        res.json(leaveRequests);
    } catch (error) {
        console.error("Error fetching leave requests:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Upload Excel file and insert data
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Process each row and insert into DB
        for (let row of data) {
            const employee = await Employee.findOne({ where: { employee_id: row.employee_id } });

            if (!employee) {
                console.warn(`Employee ID ${row.employee_id} not found, skipping entry.`);
                continue;
            }

            await LeaveRequest.create({
                employee_id: row.employee_id,
                leave_type: row.leave_type,
                start_date: row.start_date,
                end_date: row.end_date,
                status: row.status || "Pending",
                reason: row.reason || null,
            });
        }

        // Cleanup uploaded file
        fs.unlinkSync(req.file.path);
        res.json({ message: "File processed successfully!" });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
