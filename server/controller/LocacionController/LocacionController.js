import { newResponse } from "../../response/Response.js";
import { makeFilterQuery } from "../UtilsController/UtilsController.js";

export class LocacionController {
  constructor() {
    this.list = list;
    this.store = store;
    this.edit = edit;
  }
}

//los filtros tipo string ya deben tener las comillas simples
const list = (filtros = { filtrosKeys: [], filtrosValues: [] }) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query = `SELECT * FROM LOCACION` + makeFilterQuery(filtros) + ";";

    conn.query(query, (err, result) => {
      if (err) {
        resolve(newResponse("error", {}, "Error al insertar la locacion"));
      } else {
        console.log(result);
        resolve(
          newResponse(
            "success",
            result,
            "Se listaron las locaciones correctamente"
          )
        );
      }
    });
  });
};
//
//
//
const store = (tipoLocaciones) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps

    const query = `INSERT INTO LOCACION SET ?`;
    const values = tipoLocaciones;
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
  //return new Promise((resolve, reject) => {
    const ID_TIPO_LOCACION = id;
    const { DENOMINACION } = tipoLocacion;
    const conn = connectMysql;
    //add timestamps
    const updatedActivo = {
      ...activo,
      ULTIMA_MODIFICACION: new Date(),
    };
    var query = `UPDATE LOCACION SET DENOMINACION = '${DENOMINACION}' WHERE ID_TIPO_LOCACION = '${ID_TIPO_LOCACION}`;

    const values = updatedActivo;
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al editar el Tipo Locacion", err);
          return Promise.resolve(newResponse("error", {}, "Error al editar el Tipo Locacion"));
        } else {
          console.log(result);
          return Promise.resolve(
            newResponse(
              "success",
              result,
              "Se registró el activo correctamente"
            )
          );
        }
      });
    }
  //});
};
