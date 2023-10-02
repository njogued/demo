const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  HOST: process.env.MYSQL_HOoST,
  USER: process.env.MYSQL_USEeR,
  PASSWORD: process.env.MYSQL_PaWD,
  DATABASE: process.env.MYSQL_DtB,
  DIALECT: "mysql",
};
