const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Review = sequelize.define("reviews", {
  reviewBody: {
    type: DataTypes.STRING,
  },
  reviewType: {
    type: DataTypes.INTEGER,
  },
  reviewerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
