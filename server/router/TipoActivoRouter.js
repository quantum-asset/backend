import express from "express";
import { TipoActivoController } from "../controller/TipoActivoController/TipoActivoController.js";
const controller = new TipoActivoController();

const TipoActivoRouter = express.Router();

//TipoActivoRouter = express.Router();

//listar todo
TipoActivoRouter.get("", async (req, res) => {
  const respuesta = await controller.list();

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//insertar 1 o varios
TipoActivoRouter.post("", async (req, res) => {
  //must be an array
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
TipoActivoRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
TipoActivoRouter.delete("", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { TipoActivoRouter };
