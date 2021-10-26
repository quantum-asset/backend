import express from "express";
import { SesionController } from "../controller/SesionController/SesionController.js";

const SesionRouter = express.Router();
const controller = new SesionController();

//listar todo
SesionRouter.get("", async (req, res) => {
  const q = req.query;
  const respuesta = await controller.list(
    q
      ? {
          filtrosKeys: Object.keys(q),
          filtrosValues: Object.values(q),
        }
      : null
  );
  res.status(200).send(respuesta);
});

//insertar 1 o varios
SesionRouter.post("", async (req, res) => {
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
SesionRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
SesionRouter.delete("", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { SesionRouter };
