const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HalfYearlyReturn = sequelize.define(
  "HalfYearlyReturn",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reporting_period: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    factory_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    occupier_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    manager_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postal_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    license_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nic_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    industry_nature: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    industry_sector: {
      type: DataTypes.ENUM("Public", "Private"),
      allowNull: false,
    },
    applicable_clauses: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    factory_work_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Section 8: Mandays worked
    mandays_adults_male: DataTypes.INTEGER,
    mandays_adults_female: DataTypes.INTEGER,
    mandays_adults_total: DataTypes.INTEGER,

    mandays_adolescents_male: DataTypes.INTEGER,
    mandays_adolescents_female: DataTypes.INTEGER,
    mandays_adolescents_total: DataTypes.INTEGER,

    mandays_children_male: DataTypes.INTEGER,
    mandays_children_female: DataTypes.INTEGER,
    mandays_children_total: DataTypes.INTEGER,

    mandays_total: DataTypes.INTEGER,

    // Section 9: Average workers employed daily
    avg_workers_adults_male: DataTypes.INTEGER,
    avg_workers_adults_female: DataTypes.INTEGER,
    avg_workers_adults_total: DataTypes.INTEGER,

    avg_workers_adolescents_male: DataTypes.INTEGER,
    avg_workers_adolescents_female: DataTypes.INTEGER,
    avg_workers_adolescents_total: DataTypes.INTEGER,

    avg_workers_children_male: DataTypes.INTEGER,
    avg_workers_children_female: DataTypes.INTEGER,
    avg_workers_children_total: DataTypes.INTEGER,

    avg_workers_total: DataTypes.INTEGER,

    // Section 10: Medical info
    hazardous_process_workers: DataTypes.INTEGER,
    hazardous_agents: DataTypes.STRING(255),
    medical_officers_fulltime: DataTypes.INTEGER,
    medical_officers_parttime: DataTypes.INTEGER,
    workers_examined_hazardous: DataTypes.INTEGER,
    workers_examined_others: DataTypes.INTEGER,

  },
  {
    tableName: "half_yearly_returns",
    timestamps: true,
    hooks: {
      beforeValidate: (data) => {
        // Section 8 row-wise totals
        data.mandays_adults_total = (data.mandays_adults_male || 0) + (data.mandays_adults_female || 0);
        data.mandays_adolescents_total = (data.mandays_adolescents_male || 0) + (data.mandays_adolescents_female || 0);
        data.mandays_children_total = (data.mandays_children_male || 0) + (data.mandays_children_female || 0);
        data.mandays_total =
          data.mandays_adults_total + data.mandays_adolescents_total + data.mandays_children_total;

        // Section 9 row-wise totals
        data.avg_workers_adults_total = (data.avg_workers_adults_male || 0) + (data.avg_workers_adults_female || 0);
        data.avg_workers_adolescents_total =
          (data.avg_workers_adolescents_male || 0) + (data.avg_workers_adolescents_female || 0);
        data.avg_workers_children_total =
          (data.avg_workers_children_male || 0) + (data.avg_workers_children_female || 0);
        data.avg_workers_total =
          data.avg_workers_adults_total +
          data.avg_workers_adolescents_total +
          data.avg_workers_children_total;
      },
    },
    getterMethods: {
      formattedPeriod() {
        return this.reporting_period.toISOString().split('T')[0];
      },
      safeFileName() {
        return this.factory_name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      }
    }
  }
);


HalfYearlyReturn.getFactories = async function() {
  return this.findAll({
    attributes: [
      [sequelize.fn('DISTINCT', sequelize.col('factory_name')), 'name'],
      [sequelize.fn('MAX', sequelize.col('id')), 'latest_id']
    ],
    group: ['factory_name'],
    order: [['factory_name', 'ASC']],
    raw: true
  });
};

HalfYearlyReturn.getPeriodsForFactory = async function(factoryName) {
  return this.findAll({
    where: { factory_name: factoryName },
    attributes: [
      [sequelize.fn('DISTINCT', sequelize.col('reporting_period')), 'period']
    ],
    order: [['reporting_period', 'DESC']],
    raw: true
  });
};

module.exports = HalfYearlyReturn;
