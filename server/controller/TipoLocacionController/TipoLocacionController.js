import { connectMysql } from "../../mysql_conector.js";
import { newResponse } from "../../response/Response.js";
import { makeFilterQuery } from "../UtilsController/UtilsController.js";

export class TipoLocacionController {
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
      `SELECT * FROM TIPO_LOCACION` + makeFilterQuery(filtros) + ";";

    conn.query(query, (err, result) => {
      if (err) {
        resolve(newResponse("error", {}, "Error al listar tipo de locacion"));
      } else {
        console.log(result);
        resolve(
          newResponse(
            "success",
            result,
            "Se listaron los tipos de locaciones correctamente"
          )
        );
      }
    });
  });
};
const store = (tipoLocacion) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps

    const query = `INSERT INTO TIPO_LOCACION (DENOMINACION) VALUES ?`;
    const values = tipoLocacion.map((x) => [x.DENOMINACION]);
    console.log("tipo loc:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar tipo de locacion", err);
          resolve(
            newResponse("error", {}, "Error al insertar tipo de locacion")
          );
        } else {
          console.log(result);
          resolve(
            newResponse(
              "success",
              result,
              "Se registró el tipo de locación correctamente"
            )
          );
        }
      });
    }
  });
};
const edit = (id, tipoLocacion) => {
  return new Promise((resolve, reject) => {
    const ID_TIPO_LOCACION = id;
    const { DENOMINACION } = tipoLocacion;
    const conn = connectMysql;
    //add timestamps

    var query = `UPDATE TIPO_LOCACION SET DENOMINACION = '${DENOMINACION}' WHERE ID_TIPO_LOCACION = '${ID_TIPO_LOCACION}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al editar el Tipo Locacion", err);
          resolve(newResponse("error", {}, "Error al editar el Tipo Locacion"));
        } else {
          console.log(result);
          resolve(
            newResponse(
              "success",
              result,
              "Se registró el activo correctamente"
            )
          );
        }
      });
    }
  });
};
const remove = (id) => {
  return new Promise((resolve, reject) => {
    const ID_TIPO_LOCACION = id;
    const conn = connectMysql;
    //add timestamps
    var query = `UPDATE TIPO_LOCACION SET ESTADO = 0 WHERE ID_TIPO_LOCACION = '${ID_TIPO_LOCACION}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el Tipo Locacion", err);
          resolve(newResponse("error", {}, "Error al eliminar el Tipo Locacion"));
        } else {
          console.log(result);
          resolve(
            newResponse("success", result, "Se eliminó el tipo de locación correctamente")
          );
        }
      });
    }
  });
};
