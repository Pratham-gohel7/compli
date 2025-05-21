const express = require("express");
const router = express.Router();
const HalfYearlyReturn = require("../model/HalfYearlyReturnModel");
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");

const { Sequelize } = require("sequelize");

// Validation middleware
const validateHalfYearlyReturn = [
  body('reporting_period').isISO8601().toDate().withMessage('Invalid date format'),
  body('factory_name').notEmpty().trim().withMessage('Factory name is required'),
  body('occupier_name').notEmpty().trim().withMessage('Occupier name is required'),
  body('manager_name').notEmpty().trim().withMessage('Manager name is required'),
  body('district').notEmpty().trim().withMessage('District is required'),
  body('postal_address').notEmpty().trim().withMessage('Postal address is required'),
  body('registration_number').notEmpty().trim().withMessage('Registration number is required'),
  body('license_number').notEmpty().trim().withMessage('License number is required'),
  body('nic_code').notEmpty().trim().withMessage('NIC code is required'),
  body('industry_nature').notEmpty().trim().withMessage('Industry nature is required'),
  body('industry_sector').isIn(['Public', 'Private']).withMessage('Invalid industry sector'),
  body('applicable_clauses').isArray().withMessage('Applicable clauses must be an array'),
  body('factory_work_days').isInt({ min: 0, max: 186 }).withMessage('Invalid number of work days'),
  
  // Section 8 validations
  body('mandays_adults_male').optional().isInt({ min: 0 }),
  body('mandays_adults_female').optional().isInt({ min: 0 }),
  body('mandays_adolescents_male').optional().isInt({ min: 0 }),
  body('mandays_adolescents_female').optional().isInt({ min: 0 }),
  body('mandays_children_male').optional().isInt({ min: 0 }),
  body('mandays_children_female').optional().isInt({ min: 0 }),
  
  // Section 9 validations
  body('avg_workers_adults_male').optional().isInt({ min: 0 }),
  body('avg_workers_adults_female').optional().isInt({ min: 0 }),
  body('avg_workers_adolescents_male').optional().isInt({ min: 0 }),
  body('avg_workers_adolescents_female').optional().isInt({ min: 0 }),
  body('avg_workers_children_male').optional().isInt({ min: 0 }),
  body('avg_workers_children_female').optional().isInt({ min: 0 }),
  
  // Section 10 validations
  body('hazardous_process_workers').optional().isInt({ min: 0 }),
  body('hazardous_agents').optional().trim(),
  body('medical_officers_fulltime').optional().isInt({ min: 0 }),
  body('medical_officers_parttime').optional().isInt({ min: 0 }),
  body('workers_examined_hazardous').optional().isInt({ min: 0 }),
  body('workers_examined_others').optional().isInt({ min: 0 })
];


router.post('/save', async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }

  try {
    // Prepare the data
    const formData = {
      ...req.body,
      status: 'submitted' // Default status
    };

    // Create record
    const savedForm = await HalfYearlyReturn.create(formData);
    
    res.status(201).json({
      message: 'Form submitted successfully',
      success: true,
      data: {
        id: savedForm.id,
        // referenceNumber: `CNF-${savedForm.id.toString().padStart(6, '0')}`
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save form',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /factories - Get all distinct factories
router.get("/factories", async (req, res) => {
  try {
    const factories = await HalfYearlyReturn.getFactories();
    res.json(factories);
  } catch (error) {
    console.error("Factories error:", error);
    res.status(500).json({ error: "Failed to fetch factories" });
  }
});

// GET /periods/:factory - Get periods for a factory
router.get("/periods/:factory", async (req, res) => {
  try {
    const periods = await HalfYearlyReturn.getPeriodsForFactory(req.params.factory);
    res.json(periods.map(p => p.period));
  } catch (error) {
    console.error("Periods error:", error);
    res.status(500).json({ error: "Failed to fetch periods" });
  }
});

// GET /:id - Get single return by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await HalfYearlyReturn.findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
});

// Get specific return data
router.get('/data/:factoryName/:period', async (req, res) => {
    try {
        const returnData = await HalfYearlyReturn.findOne({
            where: {
                factory_name: req.params.factoryName,
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

router.get("/generate-pdf/:factoryName/:period", async (req, res) => {
    const { factoryName, period } = req.params;
    console.log("➡️ Generating PDF for employer:", factoryName, "Year:", period);

    try {
        const record = await HalfYearlyReturn.findOne({
            where: {
                factory_name: factoryName,
                reporting_period: period,
            },
        });

        if (!record) {
            console.warn("⚠️ No data found for that employer and period.");
            return res.status(404).json({ pdfUrl: null, message: "No data found." });
        }

        // ⬇️ Render the EJS template with data from DB
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/HalfYearlyReturn.ejs"),
            { data: record }
        );

        const filename = `HYR-${factoryName}-${period}.pdf`;
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


module.exports = router;