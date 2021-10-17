//const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const superSQL = "";

export const MYSQLCONFIG={
/*   host: "rfid.c8cvoei9hz72.us-east-1.rds.amazonaws.com",
  user: "adminrfid",
  password: "adminrfid001",
  database: "mydb", */
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
export const MYSQLCONFIG2={
    host: "rfid.c8cvoei9hz72.us-east-1.rds.amazonaws.com",
    user: "adminrfid",
    password: "adminrfid001",
    database: "mydb",
  
  };
export const conector = mysql.createConnection({
  /*  host: "rfid.c8cvoei9hz72.us-east-1.rds.amazonaws.com",
  user: "adminrfid",
  password: "adminrfid001",
  database: "mydb", */
  host: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const conectar = () => {
  conector.connect((err) => {
    if (err) {
      console.log(err);
      return undefined;
    }
    console.log("ok", conector);

    return conector;
  });
};
const connectMysql = mysql.createConnection(MYSQLCONFIG);


export { conectar, connectMysql};
