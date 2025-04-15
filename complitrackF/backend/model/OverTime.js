const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("./Company");
const Employee = require("./Employee");

const OverTime = sequelize.define("OverTime", {
    overtime_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: "company_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: "employee_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Month of overtime record (e.g., 'March 2025')"
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "Specific date of overtime work"
    },
    daily_hours: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Number of overtime hours worked per day"
    },
    weekly_hours: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Number of overtime hours worked per week"
    },
    additional_production: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Additional production for piece-rate workers"
    },
    overtime_hours: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Overtime hours worked"
    },
    total_overtime_hours: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "Total overtime hours worked"
    },
    normal_rate_per_hour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Normal rate per hour"
    },
    overtime_rate_per_hour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Overtime rate per hour"
    },
    normal_rate_per_piece: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Normal rate per piece"
    },
    overtime_rate_per_piece: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Overtime rate per piece"
    },
    normal_earning: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Normal earnings without overtime"
    },
    overtime_earning: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Earnings from overtime work"
    },
    total_earning: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Total earnings (Normal + Overtime)",
        get() {
            return (parseFloat(this.getDataValue("normal_earning") || 0) +
                parseFloat(this.getDataValue("overtime_earning") || 0)).toFixed(2);
        }
    },
    overtime_pay_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: "Date on which overtime payment is made"
    }
}, {
    tableName: "OverTime",
    freezeTableName: true,
    timestamps: false
});

OverTime.belongsTo(Company, { foreignKey: "company_id", as: "company" });
OverTime.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

module.exports = OverTime;
