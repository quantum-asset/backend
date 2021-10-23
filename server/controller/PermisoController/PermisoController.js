import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import { makeFilterQuery } from "../UtilsController/UtilsController.js";

export class PermisoController {
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
    const query = `SELECT * FROM PERMISO` + makeFilterQuery(filtros) + ";";
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          resolve(Response.error("Error al listar permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los permisos correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const store = (tipoLocacion) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps

    const query = `INSERT INTO PERMISO (DENOMINACION) VALUES ?`;
    const values = tipoLocacion.map((x) => [x.DENOMINACION]);
    console.log("tipo loc:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar permiso", err);
          resolve(Response.error("Error al insertar permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró el permiso correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const edit = (id, permiso) => {
  return new Promise((resolve, reject) => {
    const ID_PERMISO = id;
    const { DENOMINACION } = permiso;
    const conn = connectMysql;
    //add timestamps

    const query = `UPDATE PERMISO SET DENOMINACION = '${DENOMINACION}' WHERE ID_PERMISO = '${ID_PERMISO}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al editar el permiso", err);
          resolve(Response.error("Error al editar permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se editó el permiso correctamente")
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
    const ID_PERMISO = id;
    const conn = connectMysql;
    //add timestamps
    const query = `UPDATE PERMISO SET ESTADO = 0 WHERE ID_PERMISO = '${ID_PERMISO}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el permiso", err);
          resolve(Response.error("Error al eliminar permiso"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se eliminó el permiso correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
