const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Company = require("./Company");

const Contractor = sequelize.define("Contractor", {
    contractor_id: {
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
        onUpdate: "CASCADE"
    },
    contractor_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Name of the contractor"
    },
    contractor_address: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Address of the contractor"
    },
    nature_of_work: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nature of work assigned to the contractor"
    },
    location_of_work: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Location where contract work is being carried out"
    },
    contract_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "Start date of the contract"
    },
    contract_end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "End date of the contract"
    },
    max_male_workers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Maximum number of male workers assigned by contractor"
    },
    max_female_workers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Maximum number of female workers assigned by contractor"
    },
    total_workers: {
        type: DataTypes.INTEGER,
        get() {
            return this.max_male_workers + this.max_female_workers;
        },
        comment: "Total number of workmen assigned by the contractor"
    }
}, {
    tableName: "Contractors",
    freezeTableName: true,
    timestamps: false
});

module.exports = Contractor;
