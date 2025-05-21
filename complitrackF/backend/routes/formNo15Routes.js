const express = require("express");
const FormNo15 = require("../model/Formno15");
const Company = require("../model/Company");
const Employee = require("../model/Employee");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const router = express.Router();
const path = require("path");
const pdf = require("html-pdf");
const cache = require('memory-cache');
const sequelize = require("../config/database");

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

// ✅ Get companies with FormNo15 entries
router.get("/formno15/companies", async (req, res) => {
    const cached = cache.get('form15-companies');
    if (cached) {
        return res.json(cached);
    }
    try {
        const companies = await Company.findAll({
            attributes: ['company_id', 'company_name'], // Only return these fields
            include: [{
                model: FormNo15,
                required: true, // INNER JOIN - only companies with FormNo15 entries
                attributes: [] // Don't return FormNo15 data
            }],
            group: ['Company.company_id'], // Ensure unique companies
            order: [['company_name', 'ASC']] // Alphabetical order
        });

        if (!companies || companies.length === 0) {
            return res.status(404).json({ 
                message: "No companies found with Form15 entries" 
            });
        }
        
        cache.put('form15-companies', { success: true, data: companies }, 300000);
        return res.status(200).json({
            success: true,
            data: companies
        });

    } catch (error) {
        console.error("❌ Error fetching companies:", error);
        return res.status(500).json({ 
            success: false,
            error: "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

router.post("/generate-form15-pdf", async (req, res) => {
    const { company_id } = req.body;

    try {
        const company = await Company.findByPk(company_id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const workers = await FormNo15.findAll({
            where: { company_id },
            include: [{ 
                model: Employee
            }],
            group: ['employee_id']
        });

        if (!workers || workers.length === 0) {
            return res.status(404).json({ message: "No workers found for this company" });
        }

        // ✅ Render EJS template with data
        const html = await ejs.renderFile(
            path.join(__dirname, "../views/form15.ejs"),
            {
                companyName: company.company_name,
                natureOfWork: workers[0].nature_of_work || "-",
                workers: workers
            }
        );

        const filename = `form15_${company_id}_${Date.now()}.pdf`;
        const pdfPath = path.join(__dirname, "../public/pdfs", filename);

        // ✅ Generate PDF and save to /public/pdfs
        pdf.create(html, { format: "A4" }).toFile(pdfPath, (err) => {
            if (err) {
                console.error("PDF generation error:", err);
                return res.status(500).json({ message: "Failed to generate PDF" });
            }

            // ✅ Respond with the public URL
            return res.json({ pdfUrl: `/pdfs/${filename}` });
        });

    } catch (error) {
        console.error("❌ Error generating Form 15 PDF:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/formno15/bulk", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { data } = req.body;
        
        // Validate request format
        if (!Array.isArray(data) || data.length === 0) {
            await transaction.rollback();
            return res.status(400).json({ error: "Invalid request format" });
        }

        const today = new Date();
        const recordsToCreate = [];
        const recordsToUpdate = [];
        const existingEntries = await FormNo15.findAll({
            where: {
                employee_id: data.map(entry => entry.employee_id)
            },
            transaction
        });
        const existingEmployeeIds = existingEntries.map(e => e.employee_id);

        // Process each entry
        for (const entry of data) {
            const employee = await Employee.findByPk(entry.employee_id, { 
                attributes: ['employee_id', 'first_name', 'last_name', 'date_of_birth'],
                transaction 
            });
            
            if (!employee) continue;

            // Age validation
            const dob = new Date(employee.date_of_birth);
            const age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            const dayDiff = today.getDate() - dob.getDate();
            const isAdult = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

            if (!isAdult) continue;

            const formData = {
                ...entry,
                name: `${employee.first_name} ${employee.last_name}`,
                date_of_birth: employee.date_of_birth
            };

            if (existingEmployeeIds.includes(entry.employee_id)) {
                // Update existing record
                recordsToUpdate.push(formData);
            } else {
                // Create new record
                recordsToCreate.push(formData);
            }
        }

        // Perform bulk operations
        const results = {
            created: [],
            updated: []
        };

        if (recordsToCreate.length > 0) {
            results.created = await FormNo15.bulkCreate(recordsToCreate, { transaction });
        }

        if (recordsToUpdate.length > 0) {
            await Promise.all(recordsToUpdate.map(async (record) => {
                const [affectedCount] = await FormNo15.update(record, {
                    where: { employee_id: record.employee_id },
                    transaction
                });
                if (affectedCount > 0) {
                    results.updated.push(record);
                }
            }));
        }

        if (recordsToCreate.length === 0 && recordsToUpdate.length === 0) {
            await transaction.rollback();
            return res.status(400).json({ 
                error: "No valid adult employees found"
            });
        }

        await transaction.commit();
        
        return res.status(200).json({ 
            message: "✅ Bulk operation completed successfully!",
            results: {
                createdCount: results.created.length,
                updatedCount: results.updated.length,
                records: results
            }
        });

    } catch (error) {
        await transaction.rollback();
        console.error("❌ Error in bulk operation:", error);
        
        return res.status(500).json({ 
            error: "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
