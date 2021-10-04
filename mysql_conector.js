//const mysql = require("mysql");
import mysql from "mysql";
export const conector = mysql.createConnection({
  host: "rfid.c8cvoei9hz72.us-east-1.rds.amazonaws.com",
  user: "adminrfid",
  password: "adminrfid001",
  database: "mydb",
});
const conectar = () => {
  conector.connect((err) => {
    if (err) throw err;
    console.log("HAAAAAAAAAAAAAAA");
  });
};

export { conectar };
