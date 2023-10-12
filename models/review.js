const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Review = sequelize.define("reviews", {
  reviewBody: {
    type: DataTypes.STRING,
  },
  voteType: {
    type: DataTypes.INTEGER,
  },
  voteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "votes",
      key: "id",
    },
  },
});

module.exports = Review;
