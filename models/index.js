const sequelize = require("./db");
const User = require("./user");
const Query = require("./query");
const Vote = require("./vote");
const Review = require("./review");

// run this file to create a database from scratch.
// delete { force: true } in sequelize.sync() to alter this.

User.hasMany(Query, { foreignKey: "userId" });
Query.belongsTo(User);
Query.hasMany(Vote, { foreignKey: "queryId" });
Vote.belongsTo(Query);
Vote.hasMany(Review, { foreignKey: "voteId" });
Review.belongsTo(Vote);

sequelize
  .sync({ force: true })
  .then(function () {
    console.log("Database Configured");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = { User, Query };
