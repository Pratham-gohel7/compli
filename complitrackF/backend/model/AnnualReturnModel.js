const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("./Company");

const AnnualReturn = sequelize.define("AnnualReturn", {
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
        }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    form_data: {
        type: DataTypes.JSON, // ✅ Store entire form as JSON
        allowNull: true,
    },
    submission_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "annual_returns",
    timestamps: false
});

module.exports = AnnualReturn;
