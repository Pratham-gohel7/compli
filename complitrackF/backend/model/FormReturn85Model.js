// models/EmploymentReturn.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FormReturn85 = sequelize.define(
  "FormReturn85",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reporting_period: {
      type: DataTypes.DATEONLY, // Better for just date storage
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    company_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    contact_person_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    contact_telephone: {
      type: DataTypes.STRING(20),
      validate: {
        is: /^[\d\s\-()+]+$/, // Basic phone number validation
      },
    },
    contact_mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: /^[\d\s\-()+]+$/,
        notEmpty: true,
      },
    },
    sector: {
      type: DataTypes.ENUM(
        "Private-Act Establishment",
        "Central Govt. Under Taking",
        "State Govt. Under Taking"
      ),
      allowNull: false,
    },
    total_supervisors: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    total_workers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    total_employments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    local_supervisor_percentage: {
      // Fixed typo in field name (superviser -> supervisor)
      type: DataTypes.DECIMAL(5, 2), // 5 digits total (999.99 max)
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    local_workers_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    total_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
  },
  {
    tableName: "FormReturn85",
    timestamps: true, // Recommended to keep for audit
    paranoid: true, // Adds deletedAt for soft deletes
    hooks: {
      beforeValidate: (returnData) => {
        // Auto-calculate totals if not provided
        if (
          !returnData.total_employments &&
          returnData.total_supervisors !== undefined &&
          returnData.total_workers !== undefined
        ) {
          returnData.total_employments =
            returnData.total_supervisors + returnData.total_workers;
        }
      },
    },
  }
);

module.exports = FormReturn85;
