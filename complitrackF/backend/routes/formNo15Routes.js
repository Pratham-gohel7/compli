const express = require("express");
const FormNo15 = require("../model/Formno15");
const Company = require("../model/Company");
const Employee = require("../model/Employee");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const router = express.Router();

// ✅ Insert Single Entry into FormNo15
router.post("/formno15", async (req, res) => {
    try {
        const {
            company_id,
            employee_id,
            date_of_birth,
            sex,
            address,
            father_husbandname,
            date_of_appointment,
            alphabet_assigned,
            nature_of_work,
            number_of_relay,
            certificate_number_date,
            section_68_token_number,
            remarks
        } = req.body;

        // ✅ Validate Company
        const companyExists = await Company.findByPk(company_id);
        if (!companyExists) {
            return res.status(400).json({ error: "Invalid company_id provided." });
        }

        // ✅ Validate Employee
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            return res.status(400).json({ error: "Invalid employee_id provided." });
        }

        // ✅ Validate Date of Birth
        const birthDate = new Date(employee.date_of_birth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        const isAdult = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

        if (!isAdult) {
            return res.status(400).json({ error: "Employee must be at least 18 years old." });
        }

        // ✅ Insert into FormNo15 Table
        const newEntry = await FormNo15.create({
            company_id,
            employee_id,
            date_of_birth: employee.date_of_birth,
            sex,
            address,
            father_husbandname,
            date_of_appointment,
            alphabet_assigned,
            nature_of_work,
            number_of_relay,
            certificate_number_date,
            section_68_token_number,
            remarks
        });

  
       

        return res.status(201).json({ message: "✅ Form 15 record added successfully!", data: newEntry });
    } catch (error) {
        console.error("❌ Error inserting into FormNo15:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// router.post("/generate-pdf", async (req, res) => {
//     const { company_id } = req.body;

//     if (!company_id) {
//         return res.status(400).json({ error: "company_id is required" });
//     }

//     try {
//         const company = await Company.findByPk(company_id);
//         if (!company) {
//             return res.status(404).json({ message: "Company not found." });
//         }

//         const records = await FormNo15.findAll({
//             where: { company_id },
//             include: [{ model: Employee, attributes: ["employee_name"] }],
//             order: [["employee_id", "ASC"]],
//         });

//         if (!records.length) {
//             return res.status(404).json({ message: "No records found." });
//         }

//         const html = await ejs.renderFile(
//             path.join(__dirname, "../views/form15.ejs"),
//             {
//                 company,
//                 records,
//             }
//         );

//         const filename = `form15-${company.company_name.replace(/\s+/g, "_")}-${Date.now()}.pdf`;
//         const pdfPath = path.join(__dirname, "../public/pdfs", filename);
//         fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

//         pdf.create(html, { format: "A4" }).toFile(pdfPath, (err, result) => {
//             if (err) {
//                 console.error("PDF creation error:", err);
//                 return res.status(500).json({ error: "Failed to generate PDF" });
//             }

//             res.json({ pdfUrl: `/pdfs/${filename}` });
//         });

//     } catch (error) {
//         console.error("❌ Error generating PDF:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });


router.post("/generate-form15-pdf", async (req, res) => {
    const { company_id } = req.body;

    if (!company_id) {
        return res.status(400).json({ error: "Company ID is required" });
    }

    try {
        // 1. Validate company exists
        const company = await Company.findByPk(company_id);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        // 2. Get all Form 15 records with employee details
        const records = await FormNo15.findAll({
            where: { company_id },
            include: [{
                model: Employee,
                attributes: ["employee_name", "date_of_birth", "employee_id", "gender"]
            }],
            order: [["employee_id", "ASC"]]
        });

        if (records.length === 0) {
            return res.status(404).json({ error: "No Form 15 records found for this company" });
        }

        // 3. Prepare data for PDF
        const pdfData = {
            companyName: company.company_name,
            companyAddress: company.address || "",
            generatedDate: new Date().toLocaleDateString(),
            records: records.map((record, index) => ({
                serialNo: index + 1,
                employeeId: record.employee_id,
                employeeName: record.Employee.employee_name,
                dob: record.date_of_birth ? new Date(record.date_of_birth).toLocaleDateString() : "N/A",
                gender: record.sex || record.Employee.gender || "N/A",
                address: record.address || "N/A",
                fatherHusbandName: record.father_husbandname || "N/A",
                dateOfAppointment: record.date_of_appointment ? new Date(record.date_of_appointment).toLocaleDateString() : "N/A",
                natureOfWork: record.nature_of_work || "N/A",
                certificateDetails: record.certificate_number_date || "N/A",
                tokenNumber: record.section_68_token_number || "N/A",
                remarks: record.remarks || "N/A"
            }))
        };

        // 4. Create PDF directory if needed
        const pdfDir = path.join(__dirname, "../public/pdfs");
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        // 5. Generate filename
        const filename = `Form15_${company.company_name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
        const pdfPath = path.join(pdfDir, filename);

        // 6. Generate PDF using Puppeteer
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/form15-template.ejs"),
            pdfData
        );

        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            }
        });

        await browser.close();

        // 7. Return the PDF URL
        res.json({ 
            success: true,
            pdfUrl: `/pdfs/${filename}`,
            message: "Form 15 PDF generated successfully"
        });

    } catch (error) {
        console.error("Error generating Form 15 PDF:", error);
        res.status(500).json({ 
            error: "Failed to generate PDF",
            details: error.message 
        });
    }
});

router.post("/formno15/bulk", async (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: "Invalid request format" });
        }

        const today = new Date();
        const filteredData = [];

        for (const entry of data) {
            const employee = await Employee.findByPk(entry.employee_id);
            if (!employee) continue;

            const dob = new Date(employee.date_of_birth);
            const age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();
            const isAdult = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

            if (isAdult) {
                filteredData.push({
                    ...entry,
                    date_of_birth: employee.date_of_birth // inject DOB from DB
                });
            }
        }

        if (filteredData.length === 0) {
            return res.status(400).json({ error: "No adult employees found." });
        }

        const insertedRecords = await FormNo15.bulkCreate(filteredData);
        return res.status(201).json({ message: "✅ Bulk insert successful for adult employees only!", data: insertedRecords });
    } catch (error) {
        console.error("❌ Error inserting bulk data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
