const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
  }
);

module.exports = sequelize;
