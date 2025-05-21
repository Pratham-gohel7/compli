const express = require("express");
const router = express.Router();
const FormReturn85 = require("../model/FormReturn85Model");
const Company = require("../model/Company")
const { check, validationResult } = require("express-validator");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");

const { Sequelize } = require("sequelize");


// Validation rules
const validateReturn85 = [
  check("reporting_period").isISO8601().toDate(),
  check("company_name").not().isEmpty().trim().escape(),
  check("company_address").not().isEmpty().trim().escape(),
  check("contact_person_name").not().isEmpty().trim().escape(),
  check("contact_mobile").not().isEmpty().trim().escape(),
  check("sector").isIn([
    "Private-Act Establishment",
    "Central Govt. Under Taking",
    "State Govt. Under Taking",
  ]),
  check("total_supervisors").isInt({ min: 0 }),
  check("total_workers").isInt({ min: 0 }),
  check("local_supervisor_percentage").isFloat({ min: 0, max: 100 }),
  check("local_workers_percentage").isFloat({ min: 0, max: 100 }),
];

// POST endpoint - Create new return
router.post("/save", validateReturn85, async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Calculate derived fields
    const formData = {
      ...req.body,
      total_employments: req.body.total_supervisors + req.body.total_workers,
      total_percentage:
        req.body.local_supervisor_percentage +
          req.body.local_workers_percentage || 0,
    };

    // Create record
    const newReturn = await FormReturn85.create(formData);

    res.status(201).json({
      message: "Return submitted successfully",
      success: true,
      data: newReturn,
    });
  } catch (error) {
    // console.error('Submission error:', error);
    res.status(500).json({
      error: "Failed to submit return",
      success: false,
      details: error.message,
    });
  }
});

router.get("/preview", (req, res) => {
  res.render("../views/return85.ejs", sampleData);
});


// Get distinct employer names
router.get('/employers', async (req, res) => {
    try {
        const employers = await FormReturn85.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('company_name')), 'company_name']],
        });
        res.json(employers.map(e => e.company_name));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get reporting periods for a specific employer name
router.get('/periods/:employerName', async (req, res) => {
    try {
        const periods = await FormReturn85.findAll({
            where: { company_name: req.params.employerName },
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('reporting_period')), 'reporting_period']],
            order: [['reporting_period', 'DESC']]
        });
        res.json(periods.map(p => p.reporting_period));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get specific return data
router.get('/data/:employerName/:period', async (req, res) => {
    try {
        const returnData = await FormReturn85.findOne({
            where: {
                company_name: req.params.employerName,
                reporting_period: req.params.period
            }
        });
        
        if (!returnData) {
            return res.status(404).json({ message: 'Record not found' });
        }
        
        res.json(returnData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/generate-pdf/:employerName/:period", async (req, res) => {
    const { employerName, period } = req.params;
    console.log("➡️ Generating PDF for employer:", employerName, "Year:", period);

    try {
        const record = await FormReturn85.findOne({
            where: {
                company_name: employerName,
                reporting_period: period,
            },
        });

        if (!record) {
            console.warn("⚠️ No data found for that employer and period.");
            return res.status(404).json({ pdfUrl: null, message: "No data found." });
        }

        // let jsonData;
        // try {
        //     jsonData = JSON.parse(record.form_data);
        // } catch (err) {
        //     console.error("❌ Failed to parse JSON data:", err.message);
        //     return res.status(500).json({ message: "Invalid JSON format in DB." });
        // }

        // ⬇️ Render the EJS template with data from DB
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/return85.ejs"),
            { data: record }
        );

        const filename = `return85-${employerName}-${period}.pdf`;
        const pdfPath = path.join(__dirname, "../public/pdfs", filename);

        pdf.create(html, { format: "A4" }).toFile(pdfPath, (err, result) => {
            if (err) {
                console.error("PDF generation error:", err);
                return res.status(500).json({ error: "Failed to generate PDF" });
            }

            // ✅ Send back the downloadable PDF URL
            res.json({ pdfUrl: `/pdfs/${filename}` });
        });


    } catch (error) {
        console.error("❌ Error generating PDF:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// router.get("/generate-pdf/:employerName/:period", async (req, res) => {
//   const html = await ejs.renderFile(
//     path.join(__dirname, "../views/return85.ejs"),
//     { data: sampleData }
//   );
//   const filename = `return85-${employer_name}-${period}.pdf`;
//   const pdfPath = path.join(__dirname, "../public/pdfs", filename);

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.setContent(html, { waitUntil: "networkidle0" });

//   const pdfBuffer = await page.pdf({ format: "A4" });
//   await browser.close();

//   res.set({
//     "Content-Type": "application/pdf",
//     "Content-Disposition": "attachment; filename=employment-report.pdf",
//   });

//   res.send(pdfBuffer);
// });

module.exports = router;
