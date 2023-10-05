// Create the database table for queries posted on the platform.

const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection to DB established");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database");
//   });

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

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Queries table created");
//   })
//   .catch((error) => {
//     console.error("Failed to create queries table", error);
//   });

module.exports = Query;
