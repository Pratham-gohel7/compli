const { DataTypes, DECIMAL } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');

const Wage = sequelize.define('wages', {
  wage_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: { type: DataTypes.INTEGER, references: { model: Employee, key: 'employee_id' } },
  basic_salary: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  hra: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  da: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  other_allowances: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  pf_deduction: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  esi_deduction: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  pt_deduction: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  lwf_deduction: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  income_tax: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  advance_deduction: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  bonus: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  gratuity_eligibility: { type: DataTypes.BOOLEAN, defaultValue: false },
  gratuity_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  payment_date: { type: DataTypes.DATEONLY, allowNull: false },
  // total_deductions: { type: DataTypes.VIRTUAL, get() { return parseFloat((this.pf_deduction) + this.esi_deduction + this.pt_deduction + this.lwf_deduction + this.income_tax + this.advance_deduction); } },
  total_deductions: {
    type: DataTypes.DECIMAL(10, 2),
    // get() {
    //   return parseFloat(
    //     (parseFloat(this.pf_deduction) || 0) +
    //     (parseFloat(this.esi_deduction) || 0) +
    //     (parseFloat(this.pt_deduction) || 0) +
    //     (parseFloat(this.lwf_deduction) || 0) +
    //     (parseFloat(this.income_tax) || 0) +
    //     (parseFloat(this.advance_deduction) || 0)
    //   );
    // }
    defaultValue: 0
  },
  // total_deductions: {type}
  // net_salary: { type: DataTypes.VIRTUAL, get() { return this.basic_salary + this.hra + this.da + this.other_allowances - this.total_deductions; } },
  net_salary: {
    type: DataTypes.DECIMAL(10, 2),
    // get() {
    //   return parseFloat(
    //     parseFloat(this.basic_salary) +
    //     (parseFloat(this.hra) || 0) +
    //     (parseFloat(this.da) || 0) +
    //     (parseFloat(this.other_allowances) || 0) -
    //     (parseFloat(this.total_deductions) || 0)
    //   )
    // }
    defaultValue: 0
  },
});

Wage.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

module.exports = Wage;
