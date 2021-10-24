
import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";
import { connectMysql } from "../../mysql_conector.js";

export class AreaResponsableController {
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
    console.log("Filtros:", makeFilterQuery(filtros));
    const query = `SELECT * FROM AREA_RESPONSABLE` + makeFilterQuery(filtros) + ";";

    conn.query(query, (err, result) => {
      if (err) {
        resolve(Response.error("Error al listar AREA RESPONSABLES"));
      } else {
        console.log(result);
        resolve(
          Response.ok("success", result, "Se listaron los AREA RESPONSABLES correctamente")
        );
      }
    });
  });
};
//
//
//
const store = (areasResponsables) => {
  return new Promise((resolve, reject) => {
    //add timestamps
    const conn = connectMysql;

    const query = `INSERT INTO AREA_RESPONSABLE (DENOMINACION) VALUES ?`;
    const values = areasResponsables.map((x) => [
      x.DENOMINACION,
    ]);
    console.log("AREA RESPONSABLES:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar AREA RESPONSABLES", err);
          resolve(Response.error("Error al insertar locacion"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registraron los AREA RESPONSABLES correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const edit = (id, areaResponsable) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const ID_AREA_RESPONSABLE = id;

    const areaResponsableKeys = Object.keys(areaResponsable);
    const areaResponsableValues = [...Object.values(areaResponsable), ID_AREA_RESPONSABLE];
    const query = `UPDATE AREA_RESPONSABLE SET ${makeUpdateQuery(
        areaResponsableKeys
    )} WHERE ID_AREA_RESPONSABLE = ?`;

    if (conn) {
      conn.query(query, areaResponsableValues, (err, result) => {
        if (err) {
          console.log("Error al editar el Area responsable", err);
          resolve(newResponse("error", {}, "Error al editar el Area responsable"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se registró el Area responsable correctamente")
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
    const conn = connectMysql;
    const ID_AREA_RESPONSABLE = id;
    //add timestamps
    const query = `UPDATE AREA_RESPONSABLE SET ESTADO = 0 WHERE ID_AREA_RESPONSABLE = '${ID_AREA_RESPONSABLE}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el AREA RESPONSABLES", err);
          resolve(Response.error("Error al eliminar AREA RESPONSABLES"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se eliminó el AREA RESPONSABLES correctamente")
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
