//const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const superSQL = "";
const isProduction = true;

export const MYSQLCONFIG = {
  host: isProduction ? process.env.DB_HOST_PROD : process.env.DB_HOST,
  user: isProduction ? process.env.DB_USER_PROD : process.env.DB_USER,
  password: isProduction
    ? process.env.DB_PASSWORD_PROD
    : process.env.DB_PASSWORD,
  database: isProduction ? process.env.DB_NAME_PROD : process.env.DB_NAME,
};
console.log("MYSQLCONFIG", MYSQLCONFIG);
/* const conectar = () => {
  conector.connect((err) => {
    if (err) {
      console.log(err);
      return undefined;
    }
    console.log("ok", conector);

    return conector;
  });
}; */
const connectMysql = mysql.createConnection(MYSQLCONFIG);

export { /* conectar */ connectMysql };
