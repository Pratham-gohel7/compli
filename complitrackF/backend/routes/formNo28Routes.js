const FormNo28 = require("../model/FormNo28");
const Employee = require("../model/Employee");
const Company = require("../model/Company");
const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
// const puppeteer = require("puppeteer");
const router = express.Router();

/**
 * @route POST /api/formno28
 * @desc Insert attendance data into FormNo28 model
 */
router.post("/", async (req, res) => {
    try {
        const formData = req.body;

        if (!formData || !Array.isArray(formData) || formData.length === 0) {
            return res.status(400).json({ error: "Invalid data provided" });
        }

        // Insert all records in bulk and return the inserted data
        const insertedData = await FormNo28.bulkCreate(formData, { returning: true });

        res.status(201).json({
            message: "Form No. 28 data saved successfully",
            data: insertedData
        });
    } catch (error) {
        console.error("❌ Error inserting Form No. 28 data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/**
 * @route GET /api/formno28
 * @desc Fetch all Form No. 28 records
 */
router.get("/pdf", async (req, res) => {
    try {
        const { company_id, month_year } = req.query;

        if (!company_id || !month_year) {
            return res.status(400).json({ error: "Company ID and Month-Year are required" });
        }

        // Fetch attendance records
        const records = await FormNo28.findAll({
            where: { company_id, month_year },
            include: [
                { model: Employee, as: "employee", attributes: ["first_name", "last_name", "designation"] },
                { model: Company, as: "company", attributes: ["company_name"] }
            ]
        });

        if (!records.length) {
            return res.status(404).json({ error: "No attendance records found" });
        }

        const companyName = records[0].company ? records[0].company.company_name : "Unknown Company";

        // ✅ Render EJS template
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/form28.ejs"),
            { records, companyName, monthYear: month_year }
        );

        // ✅ Improved PDF settings
        const pdfOptions = {
            format: "A3",
            orientation: "landscape",
            border: "10mm",
        };

        // ✅ Generate PDF and store in public folder
        const filename = `FormNo28_${company_id}_${month_year}.pdf`;
        const pdfPath = path.join(__dirname, "../public/pdfs", filename);

        pdf.create(html, pdfOptions).toFile(pdfPath, (err, result) => {
                    if (err) {
                        console.error("PDF generation error:", err);
                        return res.status(500).json({ error: "Failed to generate PDF" });
                    }
        
                    // ✅ Send back the downloadable PDF URL
                    res.json({ pdfUrl: `/pdfs/${filename}` });
                });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.get("/pdf", async (req, res) => {
    try {
        const { company_id, month_year } = req.query;

        if (!company_id || !month_year) {
            return res.status(400).json({ error: "Company ID and Month-Year are required" });
        }

        // Fetch attendance records
        const records = await FormNo28.findAll({
            where: { company_id, month_year },
            include: [
                { model: Employee, as: "employee", attributes: ["first_name", "last_name", "designation"] },
                { model: Company, as: "company", attributes: ["company_name"] }
            ]
        });

        if (!records.length) {
            return res.status(404).json({ error: "No attendance records found" });
        }

        const companyName = records[0].company ? records[0].company.company_name : "Unknown Company";

        // ✅ Render EJS template
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/form28.ejs"),
            { records, companyName, monthYear: month_year }
        );

        // ✅ Improved PDF settings
        const pdfOptions = {
            format: 'A3', // Consider using A3 landscape for this wide table
            orientation: 'landscape',
            border: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm'
            },
            timeout: 30000 // Increase timeout for complex tables
        };


        pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
            if (err) {
                return res.status(500).json({ error: "Error generating PDF" });
            }
            res.setHeader("Content-Disposition", `attachment; filename=FormNo28_${company_id}_${month_year}.pdf`);
            res.setHeader("Content-Type", "application/pdf");
            res.send(buffer);
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
