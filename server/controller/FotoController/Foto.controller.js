import { connectMysql } from "../../mysql_conector.js";
import { newResponse } from "../../response/Response.js";

export const insertFoto = (foto) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    let query = "INSERT INTO `FOTO` SET ?";
    const values = {
      FOTO: foto,
      FECHA_CREACION: new Date(),
      ULTIMA_MODIFICACION: new Date(),
    };
    if (conn) {
      conn.query(query, values, (error, data) => {
        if (error) {
          console.log(error);
          resolve(newResponse("error", {}, error));
          //return newResponse("error", {}, error);
        } else {
          console.log(data);
          resolve(
            newResponse("success", data, "Se registró la foto correctamente")
          );

          //return newResponse( "success",  data, "Se registró la foto correctamente"  );
        }
      });
    }
  });
};
export const getFotoById = (id) => {
    return new Promise((resolve, reject) => {
        const conn = connectMysql;
        let query = `SELECT * FROM mydb.FOTO where ID_FOTO=${id};`;
  
        if (conn) {
          conn.query(query, (error, data) => {
            if (error) {
              console.log(error);
              resolve(newResponse("error", {}, error));
              //return newResponse("error", {}, error);
            } else {

              console.log("data=>",data[0]);
              console.log("ID_FOTO=>",data[0].ID_FOTO);
              resolve(
                newResponse("success", data, "Foto encontrada")
              );
    
              //return newResponse( "success",  data, "Se registró la foto correctamente"  );
            }
          });
        }else{
            resolve(newResponse("error", {}, "Error de conexion a la Base de datos"));

        }
      });
}
