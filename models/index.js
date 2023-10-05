const sequelize = require("./db");
const User = require("./user");
const Query = require("./query");

User.hasMany(Query);
Query.belongsTo(User);

sequelize.sync({ force: true }).then(function () {
  console.log("Database Configured");
});
module.exports = { User, Query };
