// File for user models

const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db-config");
const sequelize = require("./db");
const Query = require("./query");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const User = sequelize.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  constituency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ward: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Query);

sequelize
  .sync()
  .then(() => {
    console.log("User table created");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

module.exports = User;
