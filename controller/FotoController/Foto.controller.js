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
