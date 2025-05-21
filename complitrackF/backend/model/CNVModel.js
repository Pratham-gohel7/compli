const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CNV = sequelize.define(
  "CNV",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // 1. Employer Information
    employer_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    employer_address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    // 2. Vacancy Details
    vacancy_nature: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    worker_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Designation/Type of workers required",
    },
    duties_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    essential_qualification: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    desirable_qualification: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    age_limit: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NO"
    },
    women_eligible: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes",
    },

    // 3. Vacancy Numbers
    regular_vacancies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    temporary_vacancies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },

    // 4. Compensation
    pay_allowance: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 5. Work Location
    work_place: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Town/Village and District",
    },

    // 6. Timeline
    probable_filling_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    interview_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    interview_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    interview_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    interview_place: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    report_to: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Designation and address to report",
    },

    // 7. Reservation Categories
    sc_vacancies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    st_vacancies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    exservicemen_vacancies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    ph_vacancies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    other_vacancies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    total_vacancies:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },

    // 8. Additional Info
    other_information: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "form_cnv",
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeValidate: (form) => {
        // Ensure vacancy numbers are not negative
        if (form.regular_vacancies < 0) form.regular_vacancies = 0;
        if (form.temporary_vacancies < 0) form.temporary_vacancies = 0;
      },
    },
  }
);

module.exports = CNV;
