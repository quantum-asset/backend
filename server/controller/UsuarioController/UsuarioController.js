import { Hasher } from "../../../utils/utils.js";
import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";

/* console.log("hasher SSJ hex =>", Hasher.encode("haaaaa"));
console.log(
  "hasher SSJ hex =>",
  Hasher.compare(
    "haaaaa",
    "7120bafbf7574b3ef3b8f5279782340272d98c512b906b2bc9cb4e5e99649d207120bafbf7574b3ef3b8f5279782340272d98c512b906b2bc9cb4e5e99649d20"
  )
);
console.log("default psswrd",Hasher.random()); */
export class UsuarioController {
  constructor() {
    this.list = list;
    this.store = store;
    this.edit = edit;
    this.remove = remove;
    this.setFile = setFile;
  }
}

//los filtros tipo string ya deben tener las comillas simples
const list = (filtros = { filtrosKeys: ["ESTADO"], filtrosValues: [1] }) => {
  console.log("filtros:", filtros);
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query = `SELECT * FROM USUARIO` + makeFilterQuery(filtros) + ";";
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("error al listar usuarios:", err);
          resolve(Response.error("Error al listar usuarios"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los usuarios correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const store = (usuario) => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;
    //add timestamps
    //console.log("sha", SHA);
    //console.log("h256", sha256);
    const query = `INSERT INTO USUARIO (ID_LOCACION,ID_ROL,ID_ARCHIVO, CORREO, CONTRASENIA, NOMBRES, PRIMER_APELLIDO, SEGUNDO_APELLIDO, TIPO_DOCUMENTO_IDENTIDAD, NUM_DOCUMENTO_IDENTIDAD, FECHA_CREACION, ULTIMA_MODIFICACION) VALUES ?`;

    const values = usuario.map((x) => [
      x.ID_LOCACION,
      x.ID_ROL,
      x.ID_ARCHIVO ? x.ID_ARCHIVO : null,
      x.CORREO,
      Hasher.encode("1234567"),
      x.NOMBRES,
      x.PRIMER_APELLIDO,
      x.SEGUNDO_APELLIDO,
      x.TIPO_DOCUMENTO_IDENTIDAD,
      x.NUM_DOCUMENTO_IDENTIDAD,
      new Date(),
      new Date(),
    ]);
    console.log("USUARIOS:", values);
    if (conn) {
      conn.query(query, [values], (err, result) => {
        if (err) {
          console.log("Error al insertar usuario", err);
          resolve(Response.error("Error al insertar usuario"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró los usuarios correctamente"
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
 * @param {*} usuarioXpermiso
 * @returns
 */
const edit = (id, usuario) => {
  return new Promise((resolve, reject) => {
    const ID_USUARIO = id;
    const conn = connectMysql;
    //add timestamps
    const ULTIMA_MODIFICACION = new Date();
    const usuarioKeys = [...Object.keys(usuario), "ULTIMA_MODIFICACION"];
    const usuarioValues = [
      ...Object.values(usuario),
      ULTIMA_MODIFICACION,
      ID_USUARIO,
    ];

    const query = `UPDATE USUARIO SET ${makeUpdateQuery(
      usuarioKeys
    )}  WHERE ID_USUARIO = ?`;

    if (conn) {
      conn.query(query, usuarioValues, (err, result) => {
        if (err) {
          console.log("Error al editar el usuario", err);
          resolve(Response.error("Error al editar usuario"));
        } else {
          console.log(result);
          resolve(
            Response.ok("success", result, "Se editó el usuario correctamente")
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
    const ID_USUARIO = id;
    const conn = connectMysql;
    //add timestamps
    const query = `UPDATE USUARIO SET ESTADO = 0 WHERE ID_USUARIO = '${ID_USUARIO}'`;
    console.log("query", query);
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("Error al eliminar el USUARIO", err);
          resolve(Response.error("Error al eliminar USUARIO"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se eliminó el USUARIO correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};

const setFile = (id, file) => {};
