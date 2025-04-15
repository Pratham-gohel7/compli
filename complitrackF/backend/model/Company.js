const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  company_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  company_name: { type: DataTypes.STRING, allowNull: false },
  establishment_reg_no: { type: DataTypes.STRING },
  employer_name: { type: DataTypes.STRING },
  employer_address: { type: DataTypes.TEXT },  // New field
  employer_phoneno: { type: DataTypes.STRING }, // New field
  nature_of_work: { type: DataTypes.STRING },
  date_of_incorporation: { type: DataTypes.DATEONLY },
  pf_reg_no: { type: DataTypes.STRING },
  esi_reg_no: { type: DataTypes.STRING },
  gst_no: { type: DataTypes.STRING },
  pan_no: { type: DataTypes.STRING },
  tan_no: { type: DataTypes.STRING },
  lwf_no: { type: DataTypes.STRING },
  pt_reg_no: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  manager_name: { type: DataTypes.STRING }, // New field
  manager_address: { type: DataTypes.TEXT }, // New field
  manager_phoneno: { type: DataTypes.STRING } // New field
});


module.exports = Company;
