// Create the database table for queries posted on the platform.

const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Query = sequelize.define("queries", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  queryBody: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", // This should be the actual table name, not the model name
      key: "id",
    },
  },
});

module.exports = Query;
