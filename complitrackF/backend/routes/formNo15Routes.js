const express = require("express");
const FormNo15 = require("../model/Formno15");
const Company = require("../model/Company");
const Employee = require("../model/Employee");

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
        const employeeExists = await Employee.findByPk(employee_id);
        if (!employeeExists) {
            return res.status(400).json({ error: "Invalid employee_id provided." });
        }

        // ✅ Insert into FormNo15 Table
        const newEntry = await FormNo15.create({
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
        });

        return res.status(201).json({ message: "✅ Form 15 record added successfully!", data: newEntry });
    } catch (error) {
        console.error("❌ Error inserting into FormNo15:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Bulk Insert into FormNo15
router.post("/formno15/bulk", async (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: "Invalid request format" });
        }

        const insertedRecords = await FormNo15.bulkCreate(data);
        return res.status(201).json({ message: "✅ Bulk insert successful!", data: insertedRecords });
    } catch (error) {
        console.error("❌ Error inserting bulk data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
