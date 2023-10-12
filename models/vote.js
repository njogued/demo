const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Vote = sequelize.define("votes", {
  voteType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  voteTitle: {
    type: DataTypes.STRING,
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
    references: {
      model: "queries",
      key: "id",
    },
  },
});

module.exports = Vote;
