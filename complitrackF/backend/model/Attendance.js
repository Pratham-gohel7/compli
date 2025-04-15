const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("./Company");
const Employee = require("./Employee");

const Attendance = sequelize.define(
  "attendance",
  {
    attendance_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Employee, key: "employee_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Company, key: "company_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    month_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Dynamically create day_1 to day_31
    ...Object.fromEntries(
      [...Array(31).keys()].map((i) => [
        `day_${i + 1}`,
        { type: DataTypes.STRING, allowNull: true }, // Store "P", "A", or empty for non-existing days
      ])
    ),

    // Additional Fields
    total_mandays_worked: { type: DataTypes.INTEGER, defaultValue: 0 },
    casual_leave: { type: DataTypes.INTEGER, defaultValue: 0 },
    sick_leave: { type: DataTypes.INTEGER, defaultValue: 0 },
    privilege_leave: { type: DataTypes.INTEGER, defaultValue: 0 },
    leave_with_pay: { type: DataTypes.INTEGER, defaultValue: 0 },
    leave_without_pay: { type: DataTypes.INTEGER, defaultValue: 0 },
    any_other_reason: { type: DataTypes.INTEGER, defaultValue: 0 },
    strike: { type: DataTypes.INTEGER, defaultValue: 0 },
    layoff: { type: DataTypes.INTEGER, defaultValue: 0 },
    lockout: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_14_to_19: { type: DataTypes.INTEGER, defaultValue: 0 },
    number_festival_national_holidays: { type: DataTypes.INTEGER, defaultValue: 0 },
    number_weekly_holidays_off_paid: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_mandays_paid_for: { type: DataTypes.INTEGER, defaultValue: 0 },
    remarks: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,  // Prevents duplicate entries for the same employee & month
        fields: ["employee_id", "month_year"],
      },
    ],
  }
);

// **Before Saving Hook: Calculate Attendance Data**
Attendance.beforeSave((attendance) => {
  let presentDays = 0;
  let absentDays = 0;

  // Get the number of days in the month
  const [month, year] = attendance.month_year.split("-").map(Number);
  const totalDaysInMonth = new Date(year, month, 0).getDate();

  for (let i = 1; i <= totalDaysInMonth; i++) {
    if (attendance[`day_${i}`] === "P") presentDays++;
    if (attendance[`day_${i}`] === "A") absentDays++;
  }

  // Calculate leaves
  const cl = attendance.casual_leave || 0;
  const sl = attendance.sick_leave || 0;
  const pl = attendance.privilege_leave || 0;
  const leaveWithPay = cl + sl + pl;

  // **Calculate leave without pay**
  const leaveWithoutPay = Math.max(absentDays - leaveWithPay, 0);

  // Assign computed values
  attendance.total_mandays_worked = presentDays;
  attendance.leave_with_pay = leaveWithPay;
  attendance.leave_without_pay = leaveWithoutPay;
  attendance.total_14_to_19 =
    (attendance.strike || 0) +
    (attendance.layoff || 0) +
    (attendance.lockout || 0) +
    leaveWithPay +
    leaveWithoutPay +
    (attendance.any_other_reason || 0);
  attendance.total_mandays_paid_for = presentDays + leaveWithPay;
});

// **Associations**
Attendance.belongsTo(Employee, { foreignKey: "employee_id" });
Attendance.belongsTo(Company, { foreignKey: "company_id" });

module.exports = Attendance;
