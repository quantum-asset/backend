//const mysql = require("mysql");
import mysql from 'mysql';
const conector = mysql.createConnection(
{
    host:"quantumdb.cnufvvkpmk2z.us-east-1.rds.amazonaws.com",
    user:"quantumAdmin",
    password:"CorrectorJin&Q01"
    ,database:"quantumDB"
}


);
const conectar=()=>{
    conector.connect(err=>{
        if (err) throw err;
        console.log("HAAAAAAAAAAAAAAA");
    });
}

export {conectar};