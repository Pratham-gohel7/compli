require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./config/database"); // Database connection
const Employee = require("./model/Employee");
const Wage = require("./model/Wage");
const Attendance = require("./model/Attendance");
const LeaveRequest = require("./model/LeaveRequest");
const FormNo15 = require("./model/Formno15");
const FormNO28 = require("./model/FormNo28");
const OverTime = require("./model/OverTime");
const Contractor = require("./model/Contractor");
const authRoutes = require("./routes/authRoutes");
const annualReturnRoutes = require("./routes/AnnualReturn");

// const excelRoutes = require("./routes/excelRoutes");
const session = require("express-session");
const path = require("path");


const app = express();
app.use(bodyParser.json());




// Middleware
app.use(express.json());

app.use(cors());


app.use(morgan("dev"));

const port = process.env.PORT || 5000;



// Routes
app.use("/api/auth", authRoutes);

// Import Routes
const employeeRoutes = require("./routes/employeeRoutes");
const excelRoutes = require("./routes/excelRoutes");
const companyRoutes = require("./routes/companyRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const wageRoutes = require("./routes/wageRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const formNo15Routes = require("./routes/formNo15Routes");
const formNo28Routes = require("./routes/formNo28Routes");
const overTimeRoutes = require("./routes/OverTimeRoutes");
const contractorRoutes = require("./routes/ContractorRoutes");



app.use("/api/wages", wageRoutes);
app.use("/api/leave", leaveRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use("/api/employees", employeeRoutes); // Employee routes
app.use("/api/excel", excelRoutes);
app.use("/api", companyRoutes);
app.use("/api", pdfRoutes);
app.use("/api", formNo15Routes);
app.use("/api/form28", formNo28Routes);
app.use("/api/overtime", overTimeRoutes);
app.use("/api/annualreturn", annualReturnRoutes);
app.use("/api", contractorRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to CompliTrack API!");
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));
// Test MySQL connection
sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL Connected"))
  .catch((err) => console.error("❌ Error:", err));

// Sync all models and create tables if not exist
sequelize
  .sync({ alter: true }) // Ensures missing columns/tables are created without dropping data
  .then(() => {
    console.log("✅ Database & tables synced!");
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to sync database:", error);
  });
