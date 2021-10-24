
import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";
import { connectMysql } from "../../mysql_conector.js";

export class TipoActivoController {
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
      const query = `SELECT * FROM TIPO_ACTIVO` + makeFilterQuery(filtros) + ";";
  
      conn.query(query, (err, result) => {
        if (err) {
          resolve(Response.error("Error al listar Tipos de Activo"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se listaron los Tipos de Activo correctamente")
          );
        }
      });
    });
  };


const store = (areasResponsables) => {
  return new Promise((resolve, reject) => {
    //add timestamps
    const conn = connectMysql;

    const query = `INSERT INTO TIPO_ACTIVO (DENOMINACION) VALUES ?`;
    const values = areasResponsables.map((x) => [
      x.DENOMINACION,
    ]);
    console.log("Tipo de Activo:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar Tipo de Activo", err);
          resolve(Response.error("Error al insertar Tipos de activo"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registraron los Tipo de ActivoS correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const edit = (id, tipoActivo) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const ID_TIPO_ACTIVO = id;

    const tipoActivoKeys = Object.keys(tipoActivo);
    const tipoActivoValues = [...Object.values(tipoActivo), ID_TIPO_ACTIVO];
    const query = `UPDATE TIPO_ACTIVO SET ${makeUpdateQuery(
        tipoActivoKeys
    )} WHERE ID_TIPO_ACTIVO = ?`;

    if (conn) {
      conn.query(query, tipoActivoValues, (err, result) => {
        if (err) {
          console.log("Error al editar el Tipo de Activo", err);
          resolve(newResponse("error", {}, "Error al editar el Tipo de Activo"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se registró el Tipo de Activo correctamente")
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
    const ID_TIPO_ACTIVO = id;
    //add timestamps
    const query = `UPDATE TIPO_ACTIVO SET ESTADO = 0 WHERE ID_TIPO_ACTIVO = '${ID_TIPO_ACTIVO}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el Tipo de ActivoS", err);
          resolve(Response.error("Error al eliminar Tipo de Activo"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se eliminó el Tipo de Activo correctamente")
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
