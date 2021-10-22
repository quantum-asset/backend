import express from "express";
import mysql from "mysql";
import { LocacionController } from "../controller/LocacionController/LocacionController.js";

const LocacionRouter = express.Router();
const controller = new LocacionController();
//LocacionRouter = express.Router();

//listar todo
LocacionRouter.get("", async (req, res) => {
  let result = await controller.list();
  res.status(200).send(result);
});

//insertar 1 o varios
LocacionRouter.post("", async (req, res) => {
  //must be an array
  let result = await controller.store(req.body);
  res.status(200).send(result);
});

//editar uno
LocacionRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});

//eliminar 1
LocacionRouter.delete("", async(req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});

export { LocacionRouter };
