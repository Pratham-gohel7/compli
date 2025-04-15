// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Company = require("./Company"); // Import the Company model

// const Employee = sequelize.define("employee", {
//   employee_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   company_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: Company, // Foreign key reference
//       key: "company_id",
//     },
//     onDelete: "CASCADE", // Deletes employees if the company is deleted
//     onUpdate: "CASCADE",
//   },
//   first_name: { type: DataTypes.STRING, allowNull: false },
//   last_name: { type: DataTypes.STRING },
//   date_of_birth: { type: DataTypes.DATEONLY },
//   sex: { type: DataTypes.STRING },
//   address: { type: DataTypes.STRING },
//   father_husbandname: { type: DataTypes.STRING },
//   designation: { type: DataTypes.STRING },
//   department: { type: DataTypes.STRING },
//   alphabet_assigned: { type: DataTypes.STRING },
//   employment_type: { type: DataTypes.ENUM("Permanent", "Contract", "Inter-State Migrant Worker") },
//   date_of_joining: { type: DataTypes.DATEONLY },
//   exit_date: { type: DataTypes.DATEONLY, allowNull: true },
//   mode_of_payment: { type: DataTypes.ENUM("Bank", "Cash", "Cheque") },
//   nationality: { type: DataTypes.STRING },
//   state_of_domicile: { type: DataTypes.STRING },
//   aadhaar_number: { type: DataTypes.STRING },
//   pan_number: { type: DataTypes.STRING },
//   uan_number: { type: DataTypes.STRING },
//   esic_number: { type: DataTypes.STRING },
//   weekly_off_days: { type: DataTypes.STRING },
// });

// // Define the relationship
// Company.hasMany(Employee, { foreignKey: "company_id" });
// Employee.belongsTo(Company, { foreignKey: "company_id" });
// // Employee.hasMany(Wage, { foreignKey: "employee_id", as: "wages" });
// module.exports = Employee;




const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("./Company"); // Import the Company model

const Employee = sequelize.define("employee", {
  employee_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Company, // Foreign key reference
      key: "company_id",
    },
    onDelete: "CASCADE", // Deletes employees if the company is deleted
    onUpdate: "CASCADE",
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING },
  date_of_birth: { type: DataTypes.DATEONLY },
  sex: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  father_husbandname: { type: DataTypes.STRING },
  designation: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  alphabet_assigned: { type: DataTypes.STRING },
  employment_type: { type: DataTypes.ENUM("Permanent", "Contract", "Inter-State Migrant Worker") },
  date_of_joining: { type: DataTypes.DATEONLY },
  exit_date: { type: DataTypes.DATEONLY, allowNull: true },
  mode_of_payment: { type: DataTypes.ENUM("Bank", "Cash", "Cheque") },
  nationality: { type: DataTypes.STRING },
  state_of_domicile: { type: DataTypes.STRING },
  aadhaar_number: { type: DataTypes.STRING },
  pan_number: { type: DataTypes.STRING },
  uan_number: { type: DataTypes.STRING },
  esic_number: { type: DataTypes.STRING },
  weekly_off_days: { type: DataTypes.STRING },
  number_of_relay: { type: DataTypes.STRING }, // Number of relay if working in shift
  certificate_number_date: { type: DataTypes.STRING }, // Number & Date of Certificate
  section_68_token_number: { type: DataTypes.STRING }, // Token number under Section 68
});

// Define the relationship
Company.hasMany(Employee, { foreignKey: "company_id" });
Employee.belongsTo(Company, { foreignKey: "company_id" });
// Employee.hasMany(Wage, { foreignKey: "employee_id", as: "wages" });
module.exports = Employee;
