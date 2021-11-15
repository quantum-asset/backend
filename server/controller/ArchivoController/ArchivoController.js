import { moveImageToStorageLocation } from "../../../utils/archivo/archivo.js";
import { Hasher } from "../../../utils/utils.js";
import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import { UsuarioController } from "../UsuarioController/UsuarioController.js";

const userController = new UsuarioController();
export class ArchivoController {
  constructor() {
    //getFileById = getFileById;
    //storeFileUser = storeFileUser;
    //storeActivo = storeActivo;
    //edit = edit;
  }
  getFileById = (ID_ARCHIVO = 1) => {
    return new Promise(async (resolve, reject) => {
      const conn = connectMysql;
      const query = `SELECT * FROM ARCHIVO WHERE ID_ARCHIVO=${ID_ARCHIVO}`;
      //me devulve un array de archivos pero necesito el primero

      if (conn) {
        conn.query(query, (err, result) => {
          if (err) {
            console.log("error al listar Archivo:", err);
            resolve(Response.error("Error al listar Tomas de inventario"));
          } else {
            console.log(result);
            resolve(
              Response.ok(
                "success",
                result,
                "Se listaron los Tomas de inventario correctamente"
              )
            );
          }
        });
      } else {
        resolve(Response.error("Error al conectar con la base de datos"));
      }
    });
  };
  /* sendFileMoock=()=>{

} */
  storeFileUser = (idUser, file) => {
    return new Promise(async (resolve, reject) => {
      console.log("idUser", idUser);
      console.log("file", file);

      const conn = connectMysql;
      //add timestamps
      //console.log("sha", SHA);
      //console.log("h256", sha256);
      const newHashedName = Hasher.random();
      const ruta = process.env.RUTA_ARCHIVOS;
      const fileToSend = {
        TIPO_ARCHIVO: file.mimetype,
        NOMBRE_ARCHIVO: newHashedName,
        RUTA: ruta,
        FECHA_CREACION: new Date(),
        ULTIMA_MODIFICACION: new Date(),
      };
      console.log("fileToSend", fileToSend);

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

      //aqui debo guardarlo en la ruta del  del EFS
      const { success, error } = await moveImageToStorageLocation(
        file,
        newHashedName
      );

      if (!success) {
        console.log("error en mv", error);
        resolve(Response.error("Error al guardar archivo"));
      } else if (conn) {
        conn.query(query, [values], async (err, result) => {
          if (err) {
            console.log(
              "Error al conectar con la base de datos al insertar archivos : ",
              err
            );
            resolve(
              Response.error(
                "Error al conectar con la base de datos al insertar archivos"
              )
            );
          } else {
            resolve(
              Response.ok(
                "success",
                result,
                "Se registró el archivo en usuarios correctamente"
              )
            );
            //EN PAYLOAD ESTA EL insertId
          }
        });
      } else {
        resolve(Response.error("Error al guardar el archivo"));
      }
    });
  };
}

const store = (file) => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;
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
          console.log("Error al insertar archivo ", err);
          resolve(Response.error("Error al insertar archivo en usuario"));
        } else {
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró el archivo en usuarios correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
/* const storeFileUser = (idUser, file) => {
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
}; */
