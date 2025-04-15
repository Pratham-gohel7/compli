const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const Company = require('../model/Company');

const router = express.Router();

// 🟢 Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * 🟢 API to Upload Excel File and Store Data in MySQL (company_master table)
 */
router.post('/upload-company', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Read Excel file buffer
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Read first sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // 🟢 Insert data into MySQL (company_master table)
    for (let row of sheetData) {
      await Company.create({
        company_name: row["Company Name"],
        establishment_reg_no: row["Establishment Reg No"],
        employer_name: row["Employer Name"],
        employer_address: row["Employer Address"],  // Newly added
        employer_phoneno: row["Employer Phone no"], // Newly added
        nature_of_work: row["Nature of Work"],
        date_of_incorporation: row["Date of Incorporation"],
        pf_reg_no: row["PF Reg No"],
        esi_reg_no: row["ESI Reg No"],
        gst_no: row["GST No"],
        pan_no: row["PAN No"],
        tan_no: row["TAN No"],
        lwf_no: row["LWF No"],
        pt_reg_no: row["PT Reg No"],
        address: row["Address"],
        phone: row["Phone"],
        email: row["Email"],
        manager_name: row["Manager Name"],          // Newly added
        manager_address: row["Manager Address"],    // Newly added
        manager_phoneno: row["Manager Phone no"],   // Newly added
      });
    }

    res.json({ message: 'Company data uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🟢 API to Fetch All Companies from MySQL
 */
router.get('/companies', async (req, res) => {
  try {
    const companies = await Company.findAll(); // Fetch all companies from MySQL
    res.json(companies); // Send response as JSON
  } catch (error) {
    res.status(500).json({ error: error.message,});
  }
});

router.put("/companies/update/:id", async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedData = req.body;

    // Ensure ID is a number
    if (isNaN(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    // Find the company first
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update the company details
    await company.update(updatedData);

    res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/companies/:id", async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findOne({ where: { company_id: companyId } });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.error("❌ Error fetching company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
