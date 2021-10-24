import express from "express";
import { RolController } from "../controller/RolController/RolController.js";

const RolRouter = express.Router();
const controller = new RolController();
//RolRouter = express.Router();

//listar todo
RolRouter.get("", async (req, res) => {
  const respuesta = await controller.list();

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//insertar 1 o varios
RolRouter.post("", async (req, res) => {
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
RolRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
RolRouter.delete("", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { RolRouter };
