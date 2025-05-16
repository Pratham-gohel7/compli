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

// ✅ Bulk Insert into FormNo15
// router.post("/formno15/bulk", async (req, res) => {
//     try {
//         const { data } = req.body;
//         if (!Array.isArray(data) || data.length === 0) {
//             return res.status(400).json({ error: "Invalid request format" });
//         }

//         const insertedRecords = await FormNo15.bulkCreate(data);
//         return res.status(201).json({ message: "✅ Bulk insert successful!", data: insertedRecords });
//     } catch (error) {
//         console.error("❌ Error inserting bulk data:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });

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
