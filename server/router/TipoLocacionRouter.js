import express from "express";
import mysql from "mysql";
import { verifyToken } from "../Authentication/verifyToken.js";
import { TipoLocacionController } from "../controller/TipoLocacionController/TipoLocacionController.js";
import { newResponse } from "../response/Response.js";
const TipoLocacionRouter = express.Router();
const controller = new TipoLocacionController();
//listar todo
TipoLocacionRouter.get("",verifyToken, async (req, res) => {
  const q = req.query;
  console.log("query", q);
  const respuesta = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});

//insertar 1 o varios
TipoLocacionRouter.post("",verifyToken, async (req, res) => {
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});

//editar locacion
TipoLocacionRouter.put("/:id",verifyToken, async (req, res) => {
  // const controller = new TipoLocacionController();
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});
//eliminar locacion
TipoLocacionRouter.delete("/",verifyToken, async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});

export { TipoLocacionRouter };
