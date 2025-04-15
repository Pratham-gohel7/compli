const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');

// Import model
const Company = require('../model/Company');
const Employee = require('../model/Employee');
const Wage = require('../model/Wage');
const Attendance = require('../model/Attendance');
const LeaveRequest = require('../model/LeaveRequest');

const router = express.Router();

// 🟢 Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * 📌 Generic Function to Parse and Store Excel Data into a Table
 * @param {Object} file - Uploaded Excel file buffer
 * @param {Object} model - Sequelize Model to store data
 * @param {Object} columnMapping - Column mappings from Excel to DB fields
 */
async function processExcelFile(file, model, columnMapping) {
    try {
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Read first sheet
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const formattedData = sheetData.map(row => {
            let formattedRow = {};
            for (const excelColumn in columnMapping) {
                const dbColumn = columnMapping[excelColumn];
                formattedRow[dbColumn] = row[excelColumn];
            }
            return formattedRow;
        });

        await model.bulkCreate(formattedData);
    } catch (error) {
        throw new Error(error.message);
    }
}

// 🟢 API to Upload Company Data
router.post('/upload-company', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        await processExcelFile(req.file, Company, {
            "Company Name": "company_name",
            "Establishment Reg No": "establishment_reg_no",
            "Employer Name": "employer_name",
            "Nature of Work": "nature_of_work",
            "Date of Incorporation": "date_of_incorporation",
            "PF Reg No": "pf_reg_no",
            "ESI Reg No": "esi_reg_no",
            "GST No": "gst_no",
            "PAN No": "pan_no",
            "TAN No": "tan_no",
            "LWF No": "lwf_no",
            "PT Reg No": "pt_reg_no",
            "Address": "address",
            "Phone": "phone",
            "Email": "email",
        });

        res.json({ message: 'Company data uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🟢 API to Upload Employee Data
router.post('/upload-employee', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        await processExcelFile(req.file, Employee, {
            "Employee Code": "employee_code",
            "First Name": "first_name",
            "Last Name": "last_name",
            "Date of Birth": "date_of_birth",
            "Father or Husband Name": "father_or_husband_name",
            "Designation": "designation",
            "Department": "department",
            "Employment Type": "employment_type",
            "Date of Joining": "date_of_joining",
            "Exit Date": "exit_date",
            "Mode of Payment": "mode_of_payment",
            "Nationality": "nationality",
            "State of Domicile": "state_of_domicile",
            "Aadhaar Number": "aadhaar_number",
            "PAN Number": "pan_number",
            "UAN Number": "uan_number",
            "ESIC Number": "esic_number",
            "Weekly Off Days": "weekly_off_days",
        });

        res.json({ message: 'Employee data uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🟢 API to Upload Wage Data
router.post('/upload-wages', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        await processExcelFile(req.file, Wage, {
            "Employee ID": "employee_id",
            "Basic Salary": "basic_salary",
            "HRA": "hra",
            "DA": "da",
            "Other Allowances": "other_allowances",
            "PF Deduction": "pf_deduction",
            "ESI Deduction": "esi_deduction",
            "PT Deduction": "pt_deduction",
            "LWF Deduction": "lwf_deduction",
            "Income Tax": "income_tax",
            "Advance Deduction": "advance_deduction",
            "Bonus": "bonus",
            "Gratuity Eligibility": "gratuity_eligibility",
            "Gratuity Amount": "gratuity_amount",
            "Payment Date": "payment_date",
        });

        res.json({ message: 'Wages data uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🟢 API to Upload Attendance Data
router.post('/upload-attendance', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        await processExcelFile(req.file, Attendance, {
            "Employee ID": "employee_id",
            "Date": "date",
            "Status": "status",
            "Check-in Time": "check_in_time",
            "Check-out Time": "check_out_time",
            "Overtime Hours": "overtime_hours",
            "Night Shift": "night_shift",
            "Hazardous Work": "hazardous_work",
        });

        res.json({ message: 'Attendance data uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🟢 API to Upload Leave Requests
router.post('/upload-leave', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        await processExcelFile(req.file, LeaveRequest, {
            "Employee ID": "employee_id",
            "Leave Type": "leave_type",
            "Start Date": "start_date",
            "End Date": "end_date",
            "Status": "status",
            "Reason": "reason",
        });

        res.json({ message: 'Leave requests uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🟢 API to Fetch All Companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.findAll(); // Fetch all company records
        res.json(companies); // Send data as JSON response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
