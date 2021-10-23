import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import { makeFilterQuery } from "../UtilsController/UtilsController.js";

export class UsuarioXPermisoController {
  constructor() {
    this.list = list;
    this.store = store;
    this.edit = edit;
    this.remove = remove;
  }
}
//los filtros tipo string ya deben tener las comillas simples
const list = (filtros = { filtrosKeys: [], filtrosValues: [] }) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query =
      `SELECT * FROM USUARIO_X_PERMISO` + makeFilterQuery(filtros) + ";";
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          resolve(Response.error("Error al listar usuarios x permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los usuarios x permisos correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const store = (usuarioXPermiso) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps

    const query = `INSERT INTO USUARIO_X_PERMISO (ID_USUARIO, ID_PERMISO, INICIO, EXPIRACION, FECHA_REGISTRO) VALUES ?`;
    const values = usuarioXPermiso.map((x) => [
      x.ID_USUARIO,
      x.ID_PERMISO,
      x.INICIO,
      x.EXPIRACION,
      new Date(),
    ]);
    console.log("usuario x permiso:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar usuario x permiso", err);
          resolve(Response.error("Error al insertar usuario x permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró los usuario x permiso correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
/**
 * Lo unico editable seria la expiracion, para ampliar
 * @param {*} id 
 * @param {*} usuarioXpermiso 
 * @returns 
 */
const edit = (id, usuarioXpermiso) => {
  return new Promise((resolve, reject) => {
    const ID_USUARIO_X_PERMISO = id;
    const { EXPIRACION } = usuarioXpermiso;
    const conn = connectMysql;
    //add timestamps

    const query = `UPDATE USUARIO_X_PERMISO SET EXPIRACION = '${EXPIRACION}' WHERE ID_USUARIO_X_PERMISO = '${ID_USUARIO_X_PERMISO}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al editar el usuario x  permiso", err);
          resolve(Response.error("Error al editar usuario x permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se editó el usuario x permiso correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const remove = (id) => {
  return new Promise((resolve, reject) => {
    const ID_USUARIO_X_PERMISO = id;
    const conn = connectMysql;
    //add timestamps
    const query = `UPDATE USUARIO_X_PERMISO SET ESTADO = 0 WHERE ID_USUARIO_X_PERMISO = '${ID_USUARIO_X_PERMISO}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el usuario x permiso", err);
          resolve(Response.error("Error al eliminar usuario x  permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se eliminó el  usuario x permiso correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
