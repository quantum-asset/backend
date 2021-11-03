import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";
import { connectMysql } from "../../mysql_conector.js";

export class TagController {
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
    const query = `SELECT * FROM TAG` + makeFilterQuery(filtros) + ";";

    conn.query(query, (err, result) => {
      if (err) {
        resolve(Response.error("Error al listar tags"));
      } else {
        console.log(result);
        resolve(
          Response.ok("success", result, "Se listaron los tags correctamente")
        );
      }
    });
  });
};
//
//
//
const store = (tags) => {
  return new Promise((resolve, reject) => {
    //add timestamps
    const conn = connectMysql;

    const query = `INSERT INTO TAG (ID_LOCACION,ID_USUARIO,CODIGO, FECHA_CREACION, ULTIMA_MODIFICACION) VALUES ?`;
    const values = tags.map((x) => [
      x.ID_LOCACION,
      x.ID_USUARIO,
      x.CODIGO,
      new Date(),
      new Date(),
    ]);
    console.log("TAGS:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar tag", err);
          resolve(Response.error("Error al insertar tags"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registraron los tags correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const edit = (id, tag) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const ID_TAG = id;
    const ULTIMA_MODIFICACION = new Date();

    //add timestamps
    const tagKeys = [...Object.keys(tag), "ULTIMA_MODIFICACION"];
    const tagValues = [...Object.values(tag), ULTIMA_MODIFICACION, ID_TAG];
    const query = `UPDATE TAG SET ${makeUpdateQuery(
        tagKeys
    )} WHERE ID_TAG = ?`;

    if (conn) {
      conn.query(query, tagValues, (err, result) => {
        if (err) {
          console.log("Error al editar el Tag", err);
          resolve(newResponse("error", {}, "Error al editar el Tag"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se registró el tag correctamente")
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
    const ID_TAG = id;
    //add timestamps
    const query = `UPDATE TAG SET ESTADO = 0 WHERE ID_TAG = '${ID_TAG}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el tag", err);
          resolve(Response.error("Error al eliminar tag"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se eliminó el tag correctamente")
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
