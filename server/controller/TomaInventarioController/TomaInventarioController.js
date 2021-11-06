import { Mailer } from "../../../utils/mailer.js";
import { Hasher } from "../../../utils/utils.js";
import { connectMysql } from "../../mysql_conector.js";
import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";

export class TomaInventarioController {
  constructor() {
    this.list = list;
    this.store = store;
    this.edit = edit;
    this.remove = remove;
    // USUARIO X TOMA INVENTARIO
    this.addUsers = addUsers;
    this.addLocaciones=addLocaciones;
    ////////////////////////////
    this.setFile = setFile;
  }
}

//los filtros tipo string ya deben tener las comillas simples
const list = (filtros = { filtrosKeys: ["ESTADO"], filtrosValues: [1] }) => {
  console.log("filtros:", filtros);
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query =
      `SELECT * FROM TOMA_INVENTARIO` + makeFilterQuery(filtros) + ";";
    console.log("query:", query);

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
/**
 *
 * @param {*} tomaInventario
 * @returns
 */
const store = (tomaInvenario) => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;
    //add timestamps
    //console.log("sha", SHA);
    //console.log("h256", sha256);
    const query = `INSERT INTO TOMA_INVENTARIO (ES_MUESTREO, FECHA_INICIO, CANT_LOCACIONES) VALUES ?`;

    const values = tomaInvenario.map((x) => [
      x.ES_MUESTREO,
      x.FECHA_INICIO,
      x.CANT_LOCACIONES,
    ]);

    console.log("tomaInvenario:", values);
    if (conn) {
      conn.query(query, [values], async (err, result) => {
        if (err) {
          console.log("Error al insertar usuario", err);
          resolve(Response.error("Error al insertar usuario"));
        } else {
            //EN PAYLOAD ESTA EL insertId
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
    let usuarioKeys = [...Object.keys(usuario), "ULTIMA_MODIFICACION"];
    let usuarioValues = [
      ...Object.values(usuario),
      ULTIMA_MODIFICACION,
      ID_USUARIO,
    ];
    // check if contrasenia is being changed
    for (let i = 0; i < usuarioKeys.length; i++) {
      if (usuarioKeys[i] === "CONTRASENIA") {
        usuarioValues[i] = Hasher.encode(usuarioValues[i]);
      }
    }
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

const addUsers = (insertIdTomaInventario,USUARIOS) => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;
    //add timestamps
    //console.log("sha", SHA);
    //console.log("h256", sha256);
    const query = `INSERT INTO USUARIO_X_TOMA_INVENTARIO (ID_USUARIO,ID_TOMA_INVENTARIO) VALUES ?`;

    const values = usuarioXTomaInventario.map((x) => [
      x.ID_USUARIO,
      x.ID_TOMA_INVENTARIO,
    ]);

    console.log("USUARIOS X TOMA_INVENTARIO:", values);
    if (conn) {
      conn.query(query, [values], async (err, result) => {
        if (err) {
          console.log("Error al insertar usuarioXTomaInventario", err);
          resolve(Response.error("Error al insertar usuarioXTomaInventario"));
        } else {
          console.log(result);
         /* 
         
         BUSCAR USUARIO POR ID Y SACAR SU CORREO, TAMBIEN SACAR
         for (let i = 0; i < values.length; i++) {
            const current = values[i];
            await Mailer.sendRegisterConfirmation(current[3]);
          } */
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró los usuarioXTomaInventario correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};

///locaciones
const addLocaciones = (insertIdTomaInventario,LOCACIONES) => {
    return new Promise(async (resolve, reject) => {
      const conn = connectMysql;

      const query = `INSERT INTO TOMA_INVENTARIO_X_LOCACION (ID_USUARIO,ID_TOMA_INVENTARIO) VALUES ?`;
  
      const values = usuarioXTomaInventario.map((x) => [
        insertIdTomaInventario,
        x.ID_LOCACION,
      ]);
  
      console.log("USUARIOS X TOMA_INVENTARIO:", values);
      if (conn) {
        conn.query(query, [values], async (err, result) => {
          if (err) {
            console.log("Error al insertar usuarioXTomaInventario", err);
            resolve(Response.error("Error al insertar usuarioXTomaInventario"));
          } else {
            console.log(result);
           /* 
           
           BUSCAR USUARIO POR ID Y SACAR SU CORREO, TAMBIEN SACAR
           for (let i = 0; i < values.length; i++) {
              const current = values[i];
              await Mailer.sendRegisterConfirmation(current[3]);
            } */
            resolve(
              Response.ok(
                "success",
                result,
                "Se registró los usuarioXTomaInventario correctamente"
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
