// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();  // To load environment variables from .env

// MySQL connection using Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',   // MySQL dialect
    logging: false,     // Disable query logging
  }
);

sequelize.sync() // Auto-create tables if not exist
  .then(() => console.log('Database synchronized'))
  .catch(err => console.log('Error syncing database:', err));

module.exports = sequelize;
