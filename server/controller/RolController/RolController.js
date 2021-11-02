import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import { makeFilterQuery, makeUpdateQuery } from "../UtilsController/UtilsController.js";

export class RolController {
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
    const query = `SELECT * FROM ROL` + makeFilterQuery(filtros) + ";";
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          resolve(Response.error("Error al listar rol"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se listaron los roles correctamente")
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

    const query = `INSERT INTO ROL (DENOMINACION, DESCRIPCION) VALUES ?`;
    const values = usuarioXPermiso.map((x) => [
      x.DENOMINACION,
      x.DESCRIPCION || null,
    ]);
    console.log("roles:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar rol", err);
          resolve(Response.error("Error al insertar rol"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró los roles correctamente"
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
const edit = (id, rol) => {
  return new Promise((resolve, reject) => {
    const ID_ROL = id;
    const conn = connectMysql;
    //add timestamps

    const rolKeys = Object.keys(rol);
    const rolValues = [...Object.values(rol), ID_ROL];

    const query = `UPDATE ROL SET ${makeUpdateQuery(rolKeys)} WHERE ID_ROL = ?`;

    if (conn) {
      conn.query(query, rolValues, (err, result) => {
        if (err) {
          console.log("Error al editar el rol", err);
          resolve(Response.error("Error al editar rol"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se editó el rol correctamente"
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
 * Borrado físico del Rol en esta tabla
 * @param {*} id 
 * @returns 
 */
const remove = (id) => {
  return new Promise((resolve, reject) => {
    const ID_ROL = id;
    const conn = connectMysql;
    //add timestamps
    const query = `DELETE FROM ROL WHERE ID_ROL = '${ID_ROL}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el rol", err);
          resolve(Response.error("Error al eliminar rol"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se eliminó el rol correctamente")
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
