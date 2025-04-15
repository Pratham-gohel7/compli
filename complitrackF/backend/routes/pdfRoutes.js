const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");
const FormNo15 = require("../model/Formno15");
const Company = require("../model/Company");
const Employee = require("../model/Employee");

const router = express.Router();

router.post("/generate-pdf", async (req, res) => {
    const { company_id } = req.body;

    if (!company_id) {
        return res.status(400).json({ error: "Company ID is required" });
    }

    console.log(`📢 Generating PDF for Company ID: ${company_id}`);

    try {
        // 🔹 Fetch employees for the selected company
        const workers = await FormNo15.findAll({
            where: { company_id }, // Fetch only for the selected company
            attributes: ["remarks"],
            include: [
                {
                    model: Company,
                    attributes: ["company_name", "nature_of_work"],
                    where: { company_id }, // Ensure only the selected company's data is fetched
                },
                {
                    model: Employee,
                    attributes: [
                        "employee_id", "first_name", "date_of_birth", "sex", "address",
                        "father_husbandname", "date_of_joining", "alphabet_assigned", "number_of_relay", "certificate_number_date", "section_68_token_number"
                    ]
                }
            ]
        });

        if (workers.length === 0) {
            return res.status(404).json({ error: "No Form 15 records found for the selected company." });
        }

        // 🔹 Get Factory Info
        const companyName = workers[0]?.Company?.company_name || "N/A";
        const natureOfWork = workers[0]?.Company?.nature_of_work || "N/A";

        // 🔹 Render HTML Template
        const templatePath = path.join(__dirname, "../views/form15.ejs");
        ejs.renderFile(templatePath, { companyName, natureOfWork, workers }, (err, html) => {
            if (err) {
                console.error("❌ Error rendering HTML:", err);
                return res.status(500).json({ error: "Error generating PDF" });
            }

            // 🔹 Define PDF file path
            const fileName = `form15_${company_id}_${Date.now()}.pdf`;
            const filePath = path.join(__dirname, "../public", fileName);

            // 🔹 Generate PDF from HTML
            pdf.create(html, { format: "A4", orientation: "landscape" }).toFile(filePath, (err, result) => {
                if (err) {
                    console.error("❌ PDF Generation Error:", err);
                    return res.status(500).json({ error: "Error creating PDF" });
                }

                console.log("✅ PDF Generated Successfully!");
                res.json({ pdfUrl: `/public/${fileName}` });
                // 🔹 Send file to client
                // res.download(filePath, fileName, (err) => {
                //     if (err) {
                //         console.error("❌ Error sending file:", err);
                //         return res.status(500).json({ error: "Error downloading PDF" });
                //     }
                //     fs.unlinkSync(filePath); // Delete the file after download
                // });
            });
        });

    } catch (error) {
        console.error("❌ Error generating PDF:", error);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
});

module.exports = router;
