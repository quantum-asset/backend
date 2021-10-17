import express from "express";
import { ControllerMock } from "../controller/ControllerMock/ControllerMock.js";
//import { ControllerMock } from "../controller/ControllerMock/ControllerMock";
import {
  //conectar,
  //conectarFake,
  //conectarPromise,
  MYSQLCONFIG,
  //MYSQLCONFIG2,
} from "../mysql_conector.js";
//const express = require("express");
import mysql from "mysql";
import { reinitializeSQL } from "../reinitialize/reinitialize.js";

const rutas = express.Router();
//const ControllerMock=require("../controller/ControllerMock");

const connectMysql = mysql.createConnection(MYSQLCONFIG);


rutas.get("/", async (req, res) => {
  const q = "SELECT * FROM ROL;";
  connectMysql.query(q, (err, result, fileds) => {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      console.log("filds", fileds);
      console.log("data", result);
      res.send({ data: result });
    }
  });
});
rutas.get("/init", () => {
  connectMysql.query(reinitializeSQL, (err, result, fileds) => {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      console.log("filds", fileds);
      console.log("data", result);
      res.send({ data: result, fileds: fileds });
    }
  });
});

rutas.post("/tipo-locacion", (req, res) => {
  console.log("body: ", req.body);
  //createListOfRol
});
rutas.post("/tipo-locacion/masivo", (req, res) => {
  console.log("body: ", req.body);
  res.send({ GOT: req.body });
});

rutas.get("/locacion", (req, res) => {});

rutas.get("/usuario", (req, res) => {});

rutas.get("/rol", (req, res) => {
  var sql = "SELECT * FROM ROL;";
  connectMysql.query(sql, (err, result) => {
    if (err) {
      res
        .status(500)
        .send(
          ControllerMock(
            "error",
            [],
            "Ocurrio un error al intentar listar los roles"
          )
        );
    } else {
      res.status(200).send(ControllerMock("ok", result, "Listado exitoso"));
    }
  });
});
rutas.post("/rol", (req, res) => {
  console.log("body: ", req.body);
  const { DENOMINACION, DESCRIPCION } = req.body;
  const sql2 = `INSERT INTO ROL (DENOMINACION, DESCRIPCION) VALUES ("${DENOMINACION}","${DESCRIPCION}")`;
  const sql = `INSERT INTO ROL SET ?`;

  const value = {
    DENOMINACION: "Encargado de control de activos 2",
    DESCRIPCION:
      "Encargado del 2do seguiminto y gestión de activos fijos, incluyendo las tomas de inventario",
  };

  connectMysql.query(sql2, (err, result) => {
    if (err) {
      console.log("error", err);
      res.send(ControllerMock("error", err, "Ocurrio un error inesperado"));
      connectMysql.rollback();
    } else {
      console.log("Number of records inserted: " + result.affectedRows);
      res.send(ControllerMock("ok", result, "Registro guardado exitosamente"));
    }
  });
});
rutas.post("/rol/masivo", (req, res) => {
  console.log("body: ", req.body);

  const sql = "INSERT INTO ROL (DENOMINACION, DESCRIPCION) VALUES ?";
  var values = [
    [
      "Encargado de control de activos",
      "Encargado del seguiminto y gestión de activos fijos, incluyendo las tomas de inventario",
    ],
    [
      "Encargado de Reistro de activos",
      "Encargado del registro de nuevos activos fijos en los procesos de compra y de solicitud de tags",
    ],
    [
      "Encargado de Toma de Activos",
      "Encargado del registro y toma de inventarios",
    ],
  ];

  connectMysql.query(sql, [values], function (err, result) {
    if (err) {
      console.log("error", err);
      res.send(ControllerMock("error", err, "Ocurrio un error inesperado"));
      connectMysql.rollback();
    } else {
      console.log("Number of records inserted: " + result.affectedRows);
      res.send(ControllerMock("ok", result, "Se insertaron todos"));
    }
  });
});
rutas.post("/rol", (req, res) => {
  console.log("body: ", req.body);

  var sql = "INSERT INTO ROL (DENOMINACION, DESCRIPCION) VALUES ?";
  var values = [
    [
      "Encargado de control de activos",
      "Encargado del seguiminto y gestión de activos fijos, incluyendo las tomas de inventario",
    ],
  ];

  connectMysql.query(sql, [values], function (err, result) {
    if (err) {
      console.log("error", err);
      res.send(ControllerMock("error", err, "Ocurrio un error inesperado"));
      connectMysql.rollback();
    } else {
      console.log("Number of records inserted: " + result.affectedRows);
      res.send(ControllerMock("ok", result, "Se insertaron todos"));
    }
  });
});
rutas.get("/transaccion", (req, res) => {});

rutas.get("/permiso", (req, res) => {});

rutas.get("/trazabilidad", (req, res) => {});

rutas.get("/usuario-permiso", (req, res) => {});

rutas.get("/tag", (req, res) => {});

rutas.get("/area-responsable", (req, res) => {});

rutas.get("/tipo-activo", (req, res) => {});

rutas.get("/activo", (req, res) => {});

rutas.get("/toma-inventario", (req, res) => {});

rutas.get("/usuario-toma-inventario", (req, res) => {});

rutas.get("/toma-inventario-locacion", (req, res) => {});

rutas.get("/toma-inventario-locacion-activo", (req, res) => {});

//[12] => LISTA DE NECESIDADES
rutas.get("/necesidad-tag", (req, res) => {});

//module.exports = rutas;

export { rutas };
