const express = require("express");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const pdf = require("html-pdf");
const AnnualReturn = require("../model/AnnualReturnModel");
const router = express.Router();
const db = require("../config/database.js");
const generatePDF = require("../utils/pdfGenerator.js")

router.get("/with-annual-report", async (req, res) => {
    // const query = `
    //     SELECT DISTINCT c.company_id, c.company_name, ar.year, ar.form_data
    //     FROM companies c
    //     JOIN annual_returns ar ON c.company_id = ar.company_id
    // `;

    const query = `SELECT 
    c.company_id, 
    c.company_name,
    MAX(ar.year) AS latest_year
FROM companies c
JOIN annual_returns ar ON c.company_id = ar.company_id
GROUP BY c.company_id, c.company_name;`

    try {
        const [result] = await db.query(query); // this returns an array
        res.json(result); // send the array to frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/years/:companyId", async (req, res) => {
    const { companyId } = req.params;

    try {
        const years = await AnnualReturn.findAll({
            where: { company_id: companyId },
            attributes: ["year"],
            group: ["year"],
            order: [["year", "DESC"]],
        });

        res.json(years.map(entry => entry.year));
    } catch (error) {
        console.error("Error fetching years:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/data/:companyId/:year", async (req, res) => {
    const { companyId, year } = req.params;

    try {
        const data = await AnnualReturn.findOne({
            where: {
                company_id: companyId,
                year: year,
            },
        });

        if (!data) {
            return res.status(404).json({ message: "No annual return found for the selected company and year." });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/generate-pdf/:companyId/:year", async (req, res) => {
    const { companyId, year } = req.params;
    console.log("➡️ Generating PDF for company ID:", companyId, "Year:", year);

    try {
        const record = await AnnualReturn.findOne({
            where: {
                company_id: companyId,
                year: year,
            },
        });

        if (!record) {
            console.warn("⚠️ No data found for that company and year.");
            return res.status(404).json({ pdfUrl: null, message: "No data found." });
        }

        let jsonData;
        try {
            jsonData = JSON.parse(record.form_data);
        } catch (err) {
            console.error("❌ Failed to parse JSON data:", err.message);
            return res.status(500).json({ message: "Invalid JSON format in DB." });
        }

        // ⬇️ Render the EJS template with data from DB
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/annualReturn.ejs"),
            { data: jsonData }
        );

        const filename = `annualReturn-${companyId}-${year}.pdf`;
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

router.post("/save", async (req, res) => {
    try {
        const { company_id, year, form_data } = req.body;

        // Ensure required fields exist
        if (!company_id || !year || !form_data) {
            return res.status(400).json({ error: "Missing required fields" });
        }


        // Save the form data as JSON
        const savedReturn = await AnnualReturn.create({
            company_id,
            year,
            form_data
        });

        res.status(201).json({ message: "Annual Return saved successfully", data: savedReturn });
    } catch (error) {
        console.error("Error saving annual return or Required Field is empty", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;