const express = require("express");
const { Op } = require("sequelize");
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path"); // ✅ Add this
const ejs = require("ejs");
const pdf = require("html-pdf");

const Contractor = require("../model/Contractor");
const Company = require("../model/Company");

const router = express.Router();

// Configure Multer
const upload = multer({ storage: multer.memoryStorage() });

// Route to upload and insert Excel data
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read uploaded Excel file
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Process each row
        const contractorRecords = data.map(row => ({
            company_id: row["Company ID"],
            contractor_name: row["Contractor Name"],
            contractor_address: row["Contractor Address"],
            nature_of_work: row["Nature of Work"],
            location_of_work: row["Location of Work"],
            contract_start_date: row["Contract Start Date"],
            contract_end_date: row["Contract End Date"],
            max_male_workers: row["Male Workers"] || 0,
            max_female_workers: row["Female Workers"] || 0
        }));

        // Insert into database
        await Contractor.bulkCreate(contractorRecords);

        res.json({ message: "Data uploaded successfully", recordsInserted: contractorRecords.length });

    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch all contractors
router.get("/", async (req, res) => {
    try {
        const contractors = await Contractor.findAll();
        res.json(contractors);
    } catch (error) {
        console.error("Error fetching contractor data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/generate-form12-pdf", async (req, res) => {
    try {
        const { company_id } = req.body;
        if (!company_id) {
            return res.status(400).json({ error: "Company ID is required" });
        }

        // Fetch company and contractors
        const company = await Company.findOne({ where: { company_id } });
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }
        const contractors = await Contractor.findAll({ where: { company_id } });

        // Render EJS template
        const templatePath = path.join(__dirname, "../views/form12.ejs");
        const renderedHtml = await ejs.renderFile(templatePath, { company, contractors });

        // Convert HTML to PDF and return as buffer
        pdf.create(renderedHtml).toBuffer((err, buffer) => {
            if (err) {
                console.error("❌ Error generating PDF:", err);
                return res.status(500).json({ error: "Failed to generate PDF" });
            }

            // Send the PDF as binary (blob)
            res.set({
                "Content-Type": "application/pdf",
            });

            res.send(buffer);
        });

    } catch (error) {
        console.error("❌ Error generating Form XII PDF:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/contractor/employees/:company_id", async (req, res) => {
    try {
        const { company_id } = req.params;
        const { year } = req.query; // ✅ Get year from query params

        if (!year) {
            return res.status(400).json({ error: "Year is required" });
        }

        // Fetch contractor details for the selected company and year
        const contractorData = await Contractor.findOne({
            where: {    
                company_id,
                contract_start_date: { [Op.like]: `%${year}` } // ✅ Filter by year
            }
        });

        if (!contractorData) {
            return res.json({ skilled: 0, total: 0, male: 0, female: 0 });
        }

        res.json({
            skilled: contractorData.total_workers || 0, // Total workers assigned by contractor
            total: contractorData.total_workers || 0,
            male: contractorData.max_male_workers || 0,
            female: contractorData.max_female_workers || 0
        });

    } catch (error) {
        console.error("❌ Error fetching contractor employees:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ✅ API: Get contractors working in a selected year and company
router.get("/contractors/:companyId/:year", async (req, res) => {
    const { companyId, year } = req.params;

    try {
        const contractors = await Contractor.findAll({
            where: {
                company_id: companyId,
                contract_start_date: { [Op.lte]: `${year}-12-31` }, // Started before or in selected year
                contract_end_date: { [Op.gte]: `${year}-01-01` } // Ended after or in selected year
            }
        });

        if (!contractors.length) {
            return res.status(404).json({ message: "No contractors found for the selected company and year." });
        }

        res.json(contractors);
    } catch (error) {
        console.error("Error fetching contractors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});








module.exports = router;
