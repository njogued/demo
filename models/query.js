// Create the database table for queries posted on the platform.

const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db-config");
const db = require(".");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to DB established");
  })
  .catch((error) => {
    console.error("Unable to connect to the database");
  });

const Query = sequelize.define("queries", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  queryBody: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Queries table created");
  })
  .catch((error) => {
    console.error("Failed to create queries table");
  });

module.exports = Query;
