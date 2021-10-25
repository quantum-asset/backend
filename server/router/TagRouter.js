import express from "express";
import { TagController } from "../controller/TagController/TagController.js";

const TagRouter = express.Router();
const controller = new TagController();
//TagRouter = express.Router();

//listar todo
TagRouter.get("", async (req, res) => {
  const q = req.query;
  const respuesta = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });
  res.status(200).send(respuesta);
});

//insertar 1 o varios
TagRouter.post("", async (req, res) => {
  //must be an array
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
TagRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
TagRouter.delete("", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { TagRouter };
