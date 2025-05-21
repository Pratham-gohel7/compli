const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("./Company");
const Employee = require("./Employee");

const FormNo15 = sequelize.define("FormNo15", {
    id: {
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
        unique: true,
        references: {
            model: Employee,
            key: "employee_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    name: { type: DataTypes.STRING, allowNull: true },

    date_of_birth: { type: DataTypes.DATEONLY, allowNull: true },
    sex: { type: DataTypes.ENUM("Male", "Female", "Other"), allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    father_husbandname: { type: DataTypes.STRING, allowNull: true },
    date_of_appointment: { type: DataTypes.DATEONLY, allowNull: true },
    alphabet_assigned: { type: DataTypes.STRING, allowNull: true },
    nature_of_work: { type: DataTypes.STRING, allowNull: true },
    number_of_relay: { type: DataTypes.INTEGER, allowNull: true },
    certificate_number_date: { type: DataTypes.STRING, allowNull: true },
    section_68_token_number: { type: DataTypes.STRING, allowNull: true },
    remarks: { type: DataTypes.TEXT, allowNull: true },
}, {
    freezeTableName: true,
});

// ✅ Associations
Company.hasMany(FormNo15, { foreignKey: "company_id" });
FormNo15.belongsTo(Company, { foreignKey: "company_id" });

Employee.hasOne(FormNo15, { foreignKey: "employee_id" });
FormNo15.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = FormNo15;
