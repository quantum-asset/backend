import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";

export class NecesidadTagController {
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
      `SELECT * FROM NECESIDAD_TAG` + makeFilterQuery(filtros) + ";";
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          resolve(Response.error("Error al listar rol"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron las necesidades de tag correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const store = (necesidadTag) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps

    const query = `INSERT INTO NECESIDAD_TAG (ID_LOCACION,CANTIDAD,FECHA_SOLICITUD) VALUES ?`;
    const values = necesidadTag.map((x) => [
      x.ID_LOCACION,
      x.CANTIDAD || null,
      new Date(),
    ]);
    console.log("necesidades de tags:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar necesidades de tags", err);
          resolve(Response.error("Error al insertar necesidades de tags"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró las necesidades de tags correctamente"
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
 * @param {*} necesidadTag
 * @returns
 */
const edit = (id, necesidadTag) => {
  return new Promise((resolve, reject) => {
    const ID_NECESIDAD_TAG = id;
    const conn = connectMysql;
    //add timestamps

    const necesidadTagKeys = Object.keys(necesidadTag);
    const necesidadTagValues = [...Object.values(necesidadTag), ID_NECESIDAD_TAG];

    const query = `UPDATE NECESIDAD_TAG SET ${makeUpdateQuery(necesidadTagKeys)} WHERE ID_NECESIDAD_TAG = ?`;

    if (conn) {
      conn.query(query, necesidadTagValues, (err, result) => {
        if (err) {
          console.log("Error al editar la necesidad de tag", err);
          resolve(Response.error("Error al editar necesidad de tag"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se editó la necesidad de tag correctamente")
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
    const ID_NECESIDAD_TAG = id;
    const conn = connectMysql;
    //add timestamps
    const query = `DELETE FROM NECESIDAD_TAG WHERE ID_NECESIDAD_TAG = '${ID_NECESIDAD_TAG}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar la necesidad de tag", err);
          resolve(Response.error("Error al eliminar la necesidad de tag"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se eliminó la necesidad de tag correctamente")
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
