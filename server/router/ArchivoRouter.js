import express from "express";
import mysql from "mysql";
import { Response } from "../response/Response";

const ArchivoRouter = express.Router();

//ArchivoRouter = express.Router();

//listar todo
ArchivoRouter.get("/archivo/:id", (req, res) => {});

//insertar 1 o varios
ArchivoRouter.post("/archivo", (req, res) => {});

//editar uno
ArchivoRouter.put("/archivo", (req, res) => {});

//editar uno
ArchivoRouter.patch("/archivo", (req, res) => {});

//eliminar 1
ArchivoRouter.delete("/archivo/:id", (req, res) => {});

//insertar 1 o varios
ArchivoRouter.post("/archivo/usuario/:id", (req, res) => {
  if (!req.files || req.files.file) {
    res.send(Response.error("No se enviaron archivos"));
  } else {
    const respuesta = await controller.storeFileUser(req.params.id, req.files.file);

    if (respuesta) {
      res.status(200).send(respuesta);
    } else {
      res.status(500).send(Response.error("Ocurrió un error inesperado"));
    }
  }
});

//insertar 1 o varios
ArchivoRouter.post("/archivo/activo/:id", (req, res) => {});

export { ArchivoRouter };
