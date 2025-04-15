const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Employee = require("./Employee");
const Company = require("./Company");

const Form28 = sequelize.define("Form28", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Company, key: "company_id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Employee, key: "employee_id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

    month_year: { type: DataTypes.STRING, allowNull: false }, // Format: MM-YYYY

    serial_number_register: { type: DataTypes.STRING, allowNull: false },
    father_husbandname: { type: DataTypes.STRING, allowNull: false },
    date_of_appointment: { type: DataTypes.DATEONLY, allowNull: false },
    occupation: { type: DataTypes.STRING, allowNull: false },
    alphabet_assigned: { type: DataTypes.STRING, allowNull: true },
    number_of_relay: { type: DataTypes.INTEGER, allowNull: true },
    certificate_number_date: { type: DataTypes.STRING, allowNull: true },
    section_68_token_number: { type: DataTypes.STRING, allowNull: true },

    // Attendance Days (1-31)
    ...Object.fromEntries(
        [...Array(31).keys()].map(i => [`day_${i + 1}`, { type: DataTypes.STRING, allowNull: true }])
    ),

    total_mandays_worked: { type: DataTypes.INTEGER, defaultValue: 0 },
    strike: { type: DataTypes.INTEGER, defaultValue: 0 },
    layoff: { type: DataTypes.INTEGER, defaultValue: 0 },
    lockout: { type: DataTypes.INTEGER, defaultValue: 0 },
    leave_with_pay: { type: DataTypes.INTEGER, defaultValue: 0 },
    leave_without_pay: { type: DataTypes.INTEGER, defaultValue: 0 },
    any_other_reason: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_of_14_to_19: { type: DataTypes.INTEGER, defaultValue: 0 },
    number_festival_national_holidays: { type: DataTypes.INTEGER, defaultValue: 0 },
    number_weekly_holidays_off_paid: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_mandays_paid_for: { type: DataTypes.INTEGER, defaultValue: 0 },
    remarks: { type: DataTypes.TEXT, allowNull: true }
}, {
    tableName: "form_28",
    timestamps: false
});

// Associations
Form28.belongsTo(Company, { foreignKey: "company_id", as: "company" });
Form28.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

module.exports = Form28;
