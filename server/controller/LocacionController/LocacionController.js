import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";
import { connectMysql } from "../../mysql_conector.js";

export class LocacionController {
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
    const query = `SELECT * FROM LOCACION` + makeFilterQuery(filtros) + ";";

    conn.query(query, (err, result) => {
      if (err) {
        resolve(Response.error("Error al listar locacion"));
      } else {
        console.log(result);
        resolve(
          Response.ok(
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
const store = (locaciones) => {
  return new Promise((resolve, reject) => {
    //add timestamps
    const conn = connectMysql;

    const query = `INSERT INTO LOCACION (ID_TIPO_LOCACION,DIRECCION,DENOMINACION,DESCRIPCION) VALUES ?`;
    const values = locaciones.map((x) => [
      x.ID_TIPO_LOCACION,
      x.DIRECCION,
      x.DENOMINACION,
      x.DESCRIPCION,
    ]);
    console.log("loc:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar tipo de locacion", err);
          resolve(Response.error("Error al insertar locacion"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registraron las locaciones correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const edit = (id, locacion) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const ID_LOCACION = id;

    //add timestamps
    const locacionKeys = Object.keys(locacion);
    const locacionValues = [...Object.values(locacion), ID_LOCACION];
    const query = `UPDATE LOCACION SET ${makeUpdateQuery(
      locacionKeys
    )} WHERE ID_LOCACION = ?`;

    if (conn) {
      conn.query(query, locacionValues, (err, result) => {
        if (err) {
          console.log("Error al editar el Tipo Locacion", err);
          resolve(newResponse("error", {}, "Error al editar el Tipo Locacion"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró el activo correctamente"
            )
          );
        }
      });
    }else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const remove = (id) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;

    const ID_LOCACION = id;
    //add timestamps
    const query = `UPDATE LOCACION SET ESTADO = 0 WHERE ID_LOCACION = '${ID_LOCACION}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el Locacion", err);
          resolve(Response.error("Error al eliminar locacion"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se eliminó la locación correctamente"
            )
          );
        }
      });
    }else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
