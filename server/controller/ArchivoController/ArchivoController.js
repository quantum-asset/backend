import { Hasher } from "../../../utils/utils.js";
import { connectMysql } from "../../mysql_conector.js";
import { newResponse } from "../../response/Response.js";
import { UsuarioController } from "../UsuarioController/UsuarioController.js";

const userController = new UsuarioController();
export class ActivoController {
  constructor() {
    storeFileUser = storeFileUser;
    storeActivo = storeActivo;
    //edit = edit;
  }
}
const storeFileUser = (idUser, file) => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;
    //add timestamps
    //console.log("sha", SHA);
    //console.log("h256", sha256);
    const newHashedName = Hasher.random();
    const ruta = process.env.RUTA_ARCHIVOS;
    const fileToSend = {
      TIPO_ARCHIVO: file.mimeType,
      NOMBRE_ARCHIVO: newHashedName,
      RUTA: ruta,
      FECHA_CREACION: new Date(),
      ULTIMA_MODIFICACION: new Date(),
    };
    const files = [fileToSend];
    const query = `INSERT INTO ARCHIVO (TIPO_ARCHIVO, NOMBRE_ARCHIVO, RUTA,FECHA_CREACION,ULTIMA_MODIFICACION) VALUES ?`;

    const values = files.map((x) => [
      x.TIPO_ARCHIVO,
      x.NOMBRE_ARCHIVO,
      x.RUTA,
      x.FECHA_CREACION,
      x.ULTIMA_MODIFICACION,
    ]);

    console.log("archivo:", values);
    if (conn) {
      conn.query(query, [values], async (err, result) => {
        if (err) {
          console.log("Error al insertar archivo en usuario", err);
          resolve(Response.error("Error al insertar archivo en usuario"));
        } else {
          //EN PAYLOAD ESTA EL insertId
          const { insertId } = result;
          //ahora update en user
          const usuarioRespuesta = await controller.edit(idUser, {
            ID_ARCHIVO: insertId,
          });
          if (usuarioRespuesta.status === "error") {
            resolve(
              Response.error("Error al editar usuario ", {
                ID_ARCHIVO: insertId,
              })
            );
          } else {
            resolve(
              Response.ok(
                "success",
                { usuarioResult: usuarioRespuesta, archivoResult: result },
                "Se registró el archivo en usuarios correctamente"
              )
            );
          }
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
