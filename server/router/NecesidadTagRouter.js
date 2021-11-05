import express from "express";
import { NecesidadTagController } from "../controller/NecesidadTagController/NecesidadTagController.js";

const NecesidadTagRouter = express.Router();
const controller = new NecesidadTagController();
//NecesidadTagRouter = express.Router();

//listar todo
NecesidadTagRouter.get("", async (req, res) => {
  const q = req.query;
  const respuesta = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });
  res.status(200).send(respuesta);
});

//insertar 1 o varios
NecesidadTagRouter.post("", async (req, res) => {
  //must be an array
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
//Generalmente actualizar la fecha de atencion y estado
// proceso de atender una necesidad de tags
NecesidadTagRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
NecesidadTagRouter.delete("/", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { NecesidadTagRouter };
