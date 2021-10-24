import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";

export class ActivoController {
  constructor() {
    this.list = list;
    this.store = store;
    this.edit = edit;
    this.remove = remove;
    this.setFile = setFile;
  }
}

//los filtros tipo string ya deben tener las comillas simples
const list = (filtros = { filtrosKeys: [], filtrosValues: [] }) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query = `SELECT * FROM ACTIVO` + makeFilterQuery(filtros) + ";";
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          resolve(Response.error("Error al listar activos"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los activos correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const store = (activo) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps

    const query = `
    INSERT INTO ACTIVO (
      ID_TAG,
      ID_TIPO_ACTIVO,
      ID_LOCACION,
      ID_AREA_REPONSABLE, 
      ID_ARCHIVO, 
      DENOMINACION,
      CARACTERISTICAS,
      OBSERVACIONES,
      SERIE,
      COLOR,
      MODELO,
      MARCA,
      COSTO_ADQUISICION,
      NUM_GUIA_REMISION,
      NUM_FACTURA, 
      PROVEEDOR_RUC,
      PROVEEDOR_RAZON_SOCIAL,
      CENTRO_COSTO,
      FECHA_DE_ALTA, 
      FECHA_CREACION, 
      ULTIMA_MODIFICACION
    ) VALUES ?`;
    const values = activo.map((x) => [
      x.ID_TAG,
      x.ID_TIPO_ACTIVO,
      x.ID_LOCACION || null,
      x.ID_AREA_REPONSABLE,
      x.ID_ARCHIVO || null,
      x.DENOMINACION,
      x.CARACTERISTICAS || null,
      x.OBSERVACIONES || null,
      x.SERIE || null,
      x.COLOR || null,
      x.MODELO || null,
      x.MARCA || null,
      x.COSTO_ADQUISICION,
      x.NUM_GUIA_REMISION,
      x.NUM_FACTURA,
      x.PROVEEDOR_RUC,
      x.PROVEEDOR_RAZON_SOCIAL,
      x.CENTRO_COSTO,
      x.FECHA_DE_ALTA,
      new Date(),
      new Date(),
    ]);
    console.log("activoS:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar activo", err);
          resolve(Response.error("Error al insertar activo"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró los activos correctamente"
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
 * @param {*} activoXpermiso
 * @returns
 */
const edit = (id, activo) => {
  return new Promise((resolve, reject) => {
    const ID_ACTIVO = id;
    const conn = connectMysql;
    //add timestamps
    const ULTIMA_MODIFICACION = new Date();
    const activoKeys = [...Object.keys(activo), "ULTIMA_MODIFICACION"];
    const activoValues = [
      ...Object.values(activo),
      ULTIMA_MODIFICACION,
      ID_ACTIVO,
    ];

    const query = `UPDATE ACTIVO SET ${makeUpdateQuery(
      activoKeys
    )}  WHERE ID_ACTIVO = ?`;

    if (conn) {
      conn.query(query, activoValues, (err, result) => {
        if (err) {
          console.log("Error al editar el activo", err);
          resolve(Response.error("Error al editar activo"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se editó el activo correctamente")
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
    const ID_ACTIVO = id;
    const conn = connectMysql;
    //add timestamps
    const query = `UPDATE ACTIVO SET ESTADO = 0 WHERE ID_ACTIVO = '${ID_ACTIVO}'`;
    console.log("query", query);
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el activo", err);
          resolve(Response.error("Error al eliminar activo"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se eliminó el activo correctamente")
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const setFile = (id, file) => {};
