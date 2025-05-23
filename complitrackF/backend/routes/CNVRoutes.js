const express = require('express');
const router = express.Router();
const CNV = require('../model/CNVModel');
const { check, validationResult } = require('express-validator');
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");

const { Sequelize } = require("sequelize");

// Validation rules
const validateFormCNV = [
  // Employer Info
  check('employer_name').trim().notEmpty().withMessage('Employer name is required'),
  check('employer_address').trim().notEmpty().withMessage('Address is required'),
  check('telephone').optional().isMobilePhone().withMessage('Invalid phone number'),

  // Vacancy Details
  check('vacancy_nature').trim().notEmpty().withMessage('Nature of vacancy is required'),
  check('worker_type').trim().notEmpty().withMessage('Worker type is required'),
  check('duties_description').trim().notEmpty().withMessage('Duties description is required'),
  check('essential_qualification').trim().notEmpty().withMessage('Essential qualification is required'),
  
  // Numbers validation
  check('regular_vacancies').isInt({ min: 0 }).withMessage('Must be zero or positive'),
  check('temporary_vacancies').isInt({ min: 0 }).withMessage('Must be zero or positive'),
  check('sc_vacancies').optional().isInt({ min: 0 }),
  check('st_vacancies').optional().isInt({ min: 0 }),

  // Dates validation
  check('probable_filling_date').isISO8601().toDate(),
  check('interview_date').optional().isISO8601().toDate()
];

// POST endpoint - Save form data
router.post('/save', validateFormCNV, async (req, res) => {
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
    const formData = {
      ...req.body,
      status: 'submitted'
    };

    const savedForm = await CNV.create(formData);
    console.log("Received CNV form data:", req.body);

    res.status(201).json({
      message: 'Form submitted successfully',

      success: true,
      data: {
        id: savedForm.id,
        referenceNumber: `CNV-${savedForm.id.toString().padStart(6, '0')}`
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


// Get distinct employer names
router.get('/employers', async (req, res) => {
    try {
        const employers = await CNV.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('employer_name')), 'employer_name']],
        });
        res.json(employers.map(e => e.employer_name));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// with date
router.get('/dates/:employerName', async (req, res) => {
    try {
        const date = await CNV.findAll({
            where: { employer_name: req.params.employerName },
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('updatedAt')), 'updatedAt']],
            order: [['updatedAt', 'DESC']]
        });
        res.json(date.map(p => p.updatedAt));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific return data
router.get('/data/:employerName/:date', async (req, res) => {
    try {
        const returnData = await CNV.findOne({
            where: {
                employer_name: req.params.employerName,
                updatedAt: req.params.date
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

router.get("/generate-pdf/:employerName/:date", async (req, res) => {
    const { employerName, date } = req.params;
    console.log("➡️ Generating PDF for employer:", employerName, "Year:", date);

    try {
        const record = await CNV.findOne({
            where: {
                employer_name: employerName,
                updatedAt: date,
            },
        });

        if (!record) {
            console.warn("⚠️ No data found for that employer and period.");
            return res.status(404).json({ pdfUrl: null, message: "No data found." });
        }
        
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/CNV.ejs"),
            { data: record }
        );

        const filename = `cnv-${employerName}-${record.id}.pdf`;
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