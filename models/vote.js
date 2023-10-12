const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Vote = sequelize.define("votes", {
  voteFor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  voteBody: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  voterID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  queryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Vote;
