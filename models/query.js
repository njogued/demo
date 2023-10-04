// Create the database table for queries posted on the platform.

const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db-config");
const sequelize = require("./db");
const User = require("./user");

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

Query.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync()
  .then(() => {
    console.log("Queries table created");
  })
  .catch((error) => {
    console.error("Failed to create queries table", error);
  });

module.exports = Query;
