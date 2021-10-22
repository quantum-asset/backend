import { connectMysql } from "../../mysql_conector.js";
import { newResponse } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";
export class ActivoController {
  constructor() {
    this.list = list;

    store = store;
    edit = edit;
  }
}
//los filtros tipo string ya deben tener las comillas simples
const list = (filtros = { filtrosKeys: [], filtrosValues: [] }) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query = `SELECT * FROM ACTIVO` + makeFilterQuery(filtros) + ";";

    conn.query(query, (err, result) => {
      if (err) {
        resolve(newResponse("error", {}, "Error al listar activos"));
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
const store = (activo) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps
    const updatedActivo = {
      ...activo,
      FECHA_CREACION: new Date(),
      ULTIMA_MODIFICACION: new Date(),
    };
    const query = `INSERT INTO ACTIVO SET ?`;
    const values = updatedActivo;
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar activo", err);
          resolve(newResponse("error", {}, error));
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
const edit = (id, activo) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    
    //add timestamps
    const updatedActivo = {
      ...activo,
      ULTIMA_MODIFICACION: new Date(),
    };
    
    const updateKeys = Object.keys(updatedActivo);
    const upDateValues = Object.values(updatedActivo);
    const query = `UPDATE ACTIVO SET ? ${makeUpdateQuery({
      atributosKeys: updateKeys,
      atributosValues: upDateValues,
    })} WHERE ID_ACTIVO = ${id}`;

    const values = updatedActivo;
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Activo store error", err);
          resolve(newResponse("error", {}, error));
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
const setFile = (id, file)=>{

}