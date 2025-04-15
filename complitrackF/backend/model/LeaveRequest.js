const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Employee = require("./Employee");

const LeaveRequest = sequelize.define("leave_requests", {
  leave_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  leave_type: {
    type: DataTypes.ENUM("Casual Leave", "Earned Leave", "Sick Leave", "Maternity Leave", "Unpaid Leave"),
    allowNull: false
  },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  end_date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM("Pending", "Approved", "Rejected"), defaultValue: "Pending" },
  reason: { type: DataTypes.TEXT, allowNull: true },
}, { timestamps: false });

// Define relationship
LeaveRequest.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });
Employee.hasMany(LeaveRequest, { foreignKey: "employee_id", as: "leaveRequests" });

module.exports = LeaveRequest;
