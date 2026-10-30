const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});
console.log("DB_SENHA:", typeof process.env.DB_SENHA);
module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_SENHA,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
    },
}

