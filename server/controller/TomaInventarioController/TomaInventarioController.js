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
    this.listUsers = listUsers;

    // LOCACION X TOMA INVENTARIO
    this.addLocaciones = addLocaciones;
    this.listLocaciones = listLocaciones;
    this.editLocacionXTomaInventario = editLocacionXTomaInventario;
    // TOMA INVENTARIO X LOCACION x ACTIVO
    this.listActivoXTomaInventarioXLcacion = listActivoXTomaInventarioXLcacion;
    this.addActivoXTomaInventarioXLcacion = addActivoXTomaInventarioXLcacion;

    ////////////////////////////
    this.setFile = setFile;
  }
}

const listActivoXTomaInventarioXLcacion = (
  ID_LOCACION,
  ID_TOMA_INVENTARIO_X_LOCACION
) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query = `SELECT * FROM ACTIVO as A join TOMA_INVENTARIO_X_LOCACION_X_ACTIVO as TILA on TILA.ID_ACTIVO = A.ID_ACTIVO where A.ID_LOCACION=${ID_LOCACION} and TILA.ID_TOMA_INVENTARIO_X_LOCACION=${ID_TOMA_INVENTARIO_X_LOCACION};`;
    console.log("query:", query);

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("error al listar Tomas de inventario:", err);
          resolve(Response.error("Error al listar Tomas de inventario"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los Tomas de inventario correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
const addActivoXTomaInventarioXLcacion = () => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;

    const query = `INSERT INTO TOMA_INVENTARIO_X_LOCACION_X_ACTIVO (ID_TOMA_INVENTARIO_X_LOCACION, ID_ACTIVO, ID_USUARIO,FECHA,OBSERVACION,ENCONTRADO) VALUES ?`;
    const FECHA_ACTUAL = new Date();
    const values = tomaInvenario.map((x) => [
      x.ID_TOMA_INVENTARIO_X_LOCACION,
      x.ID_ACTIVO,
      x.ID_USUARIO,
      FECHA_ACTUAL,
      x.OBSERVACION,
      x.ENCONTRADO,
    ]);

    console.log("tomaInvenario x activos:", values);
    if (conn) {
      conn.query(query, [values], async (err, result) => {
        if (err) {
          console.log("Error al insertar activos toma inventario", err);
          resolve(Response.error("Error al insertar usuario"));
        } else {
          //EN PAYLOAD ESTA EL insertId
          resolve(
            Response.ok(
              "success",
              result,
              "Se registró los activos toma inventario correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
//los filtros tipo string ya deben tener las comillas simples
const list = (
  //filtros = { filtrosKeys: ["ESTADO"], filtrosValues: [1] }
  filtros = { filtrosKeys: [], filtrosValues: [] }
) => {
  console.log("filtros:", filtros);
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query =
      `SELECT * FROM TOMA_INVENTARIO` + makeFilterQuery(filtros) + ";";
    console.log("query:", query);

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("error al listar Tomas de inventario:", err);
          resolve(Response.error("Error al listar Tomas de inventario"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los Tomas de inventario correctamente"
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

const editLocacionXTomaInventario = (
  ID_LOCACION,
  ID_TOMA_INVENTARIO,
  tomaINventario
) => {
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    //add timestamps
    const FECHA = new Date();
    let tomaINventarioKeys = [...Object.keys(tomaINventario), "FECHA"];
    let tomaINventarioValues = [
      ...Object.values(tomaINventario),
      FECHA,
      ID_TOMA_INVENTARIO,
      ID_LOCACION,
    ];

    const query = `UPDATE TOMA_INVENTARIO_X_LOCACION SET ${makeUpdateQuery(
      tomaINventarioKeys
    )}  WHERE ID_TOMA_INVENTARIO = ? and ID_LOCACION = ?`;

    if (conn) {
      conn.query(query, tomaINventarioValues, (err, result) => {
        if (err) {
          console.log("Error al editar la toma de inevntario", err);
          resolve(Response.error("Error al editar toma de inevrntario"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se editó la toma de inevntario correctamente"
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
 */
const edit = (id, tomaINventario) => {
  return new Promise((resolve, reject) => {
    const ID_TOMA_INVENTARIO = id;
    const conn = connectMysql;
    //add timestamps
    const FECHA_FIN = new Date();
    let tomaINventarioKeys = [...Object.keys(tomaINventario), "FECHA_FIN"];
    let tomaINventarioValues = [
      ...Object.values(tomaINventario),
      FECHA_FIN,
      ID_TOMA_INVENTARIO,
    ];

    const query = `UPDATE TOMA_INVENTARIO SET ${makeUpdateQuery(
      tomaINventarioKeys
    )}  WHERE ID_TOMA_INVENTARIO = ?`;

    if (conn) {
      conn.query(query, tomaINventarioValues, (err, result) => {
        if (err) {
          console.log("Error al editar la toma de inevntario", err);
          resolve(Response.error("Error al editar toma de inevrntario"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se editó la toma de inevntario correctamente"
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
          console.log("Error al eliminar la toma de inevntario", err);
          resolve(Response.error("Error al eliminar USUARIO"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se eliminó la toma de inevntario correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};

const addUsers = (insertIdTomaInventario, USUARIOS) => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;
    //add timestamps
    //console.log("sha", SHA);
    //console.log("h256", sha256);
    const query = `INSERT INTO USUARIO_X_TOMA_INVENTARIO (ID_USUARIO,ID_TOMA_INVENTARIO) VALUES ?`;

    const values = USUARIOS.map((x) => [x.ID_USUARIO, insertIdTomaInventario]);

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
const addLocaciones = (insertIdTomaInventario, LOCACIONES) => {
  return new Promise(async (resolve, reject) => {
    const conn = connectMysql;

    const query = `INSERT INTO TOMA_INVENTARIO_X_LOCACION (ID_TOMA_INVENTARIO,ID_LOCACION) VALUES ?`;

    const values = LOCACIONES.map((x) => [
      insertIdTomaInventario,
      x.ID_LOCACION,
    ]);

    console.log("LOCACIONES X TOMA_INVENTARIO:", values);
    if (conn) {
      conn.query(query, [values], async (err, result) => {
        if (err) {
          console.log("Error al insertar locacionesXTomaInventario", err);
          resolve(
            Response.error("Error al insertar locacionesXTomaInventario")
          );
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
              "Se registró los locacionesXTomaInventario correctamente"
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
/////////////////////////////////
//////                   LISTAR TOMA INVENTARIO X USUARIOS
///////////////////////////////////

const listUsers = (filtros = { filtrosKeys: [], filtrosValues: [] }) => {
  console.log("filtros:", filtros);
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query =
      `SELECT * FROM USUARIO_X_TOMA_INVENTARIO join USUARIO on USUARIO.ID_USUARIO = USUARIO_X_TOMA_INVENTARIO.ID_USUARIO` +
      makeFilterQuery(filtros) +
      ";";
    ///////////////////////
    console.log("query ", query);
    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("error al listar Tomas de inventario x usuarios:", err);
          resolve(Response.error("Error al listar Tomas de inventario"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los Tomas de inventario x usuarios correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};

/////////////////////////////////
//////                   LISTAR TOMA INVENTARIO X LOCACIONES
///////////////////////////////////
const listLocaciones = (filtros = { filtrosKeys: [], filtrosValues: [] }) => {
  console.log("filtros:", filtros);
  return new Promise((resolve, reject) => {
    const conn = connectMysql;
    const query =
      `SELECT * FROM TOMA_INVENTARIO_X_LOCACION join LOCACION on LOCACION.ID_LOCACION = TOMA_INVENTARIO_X_LOCACION.ID_LOCACION` +
      makeFilterQuery(filtros) +
      ";";
    ///////////////////////

    if (conn) {
      conn.query(query, (err, result) => {
        if (err) {
          console.log("error al listar Tomas de inventario x locacion:", err);
          resolve(Response.error("Error al listar Tomas de inventario"));
        } else {
          console.log(result);
          resolve(
            Response.ok(
              "success",
              result,
              "Se listaron los Tomas de inventario x locacion correctamente"
            )
          );
        }
      });
    } else {
      resolve(Response.error("Error al conectar con la base de datos"));
    }
  });
};
