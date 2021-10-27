import express from "express";
import mysql from "mysql";
import { verifyToken } from "../Authentication/verifyToken.js";
import { LocacionController } from "../controller/LocacionController/LocacionController.js";
import { Response } from "../response/Response.js";

const LocacionRouter = express.Router();
const controller = new LocacionController();
//LocacionRouter = express.Router();

//listar todo
LocacionRouter.get("", verifyToken, async (req, res) => {
  const q = req.query;
  const respuesta = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });
  res.status(200).send(respuesta);
});

//insertar 1 o varios
LocacionRouter.post("", verifyToken, async (req, res) => {
  //must be an array
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
LocacionRouter.put("/:id", verifyToken, async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
LocacionRouter.delete("", verifyToken, async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { LocacionRouter };
