import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";
import { connectMysql } from "../../mysql_conector.js";
import { Hasher } from "../../../utils/utils.js";

export class SesionController {
  constructor() {
    this.list = list;
    this.store = store;
    this.edit = edit;
    this.remove = remove;
  }
}

/**
 * Listar las sesiones activas
 * esto sirve al scheduler para refrescar y setear en 0
 * las que ya expiraron
 *
 * @param {*} filtros
 * @returns
 */
const list = (filtros = { filtrosKeys: ["ESTADO"], filtrosValues: [1] }) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //console.log("Filtros:", makeFilterQuery(filtros));
    const query = `SELECT * FROM SESION` + makeFilterQuery(filtros) + ";";

    conn.query(query, (err, result,fields) => {
      if (err) {
        resolve(Response.error("Error al listar sesiones"));
      } else {
        //console.log("result",result);
        //console.log("fields",fields);
        resolve(
          Response.ok(
            "success",
            result,
            "Se listaron los sesiones correctamente"
          )
        );
      }
    });
  });
};

/**
 * Crea una nueva sesion
 * al hacer login, despues, solo se trata de refrescar
 * @param {*} sesiones
 * @returns
 */
const store = (sesiones) => {
  return new Promise((resolve, reject) => {
    //add timestamps
    const conn = connectMysql;
    const currentDate = new Date();
    const newToken =  Hasher.token();
    const query = `INSERT INTO SESION (ID_USUARIO,TOKEN,EXPIRACION) VALUES ?`;
    const values = sesiones.map((x) => [
      x.ID_USUARIO,
      newToken,
      new Date(currentDate.getTime() + 5 * 60000),
    ]);
    //console.log("sesiones:", values);
    if (conn) {
      conn.query(query, [values], (err, result,fields) => {
       
        if (err) {
          console.log("Error al insertar SESION", err);
          resolve(Response.error("Error al insertar locacion"));
        } else {
          //console.log(result);
          resolve(
            Response.ok(
              "success",
              {},
              "Se registraron los sesiones correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const edit = (id, SESION) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const ID_SESION = id;
    const ULTIMA_MODIFICACION = new Date();

    //add timestamps
    const SESIONKeys = [...Object.keys(SESION), "ULTIMA_MODIFICACION"];
    const SESIONValues = [
      ...Object.values(SESION),
      ULTIMA_MODIFICACION,
      ID_SESION,
    ];
    const query = `UPDATE SESION SET ${makeUpdateQuery(
      SESIONKeys
    )} WHERE ID_SESION = ?`;

    if (conn) {
      conn.query(query, SESIONValues, (err, result) => {
        if (err) {
          console.log("Error al editar el SESION", err);
          resolve(newResponse("error", {}, "Error al editar el SESION"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se editó el SESION correctamente"
            )
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
    const ID_SESION = id;
    //add timestamps
    const query = `UPDATE SESION SET ESTADO = 0 WHERE ID_SESION = '${ID_SESION}'`;

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el SESION", err);
          resolve(Response.error("Error al eliminar SESION"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se eliminó el SESION correctamente")
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
