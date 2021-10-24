import express from "express";
import { PermisoController } from "../controller/PermisoController/PermisoController.js";
import { UsuarioXPermisoController } from "../controller/UsuarioXPermisoController/UsuarioXPermisoController.js";
import { Response } from "../response/Response.js";

const PermisoRouter = express.Router();
const controller = new PermisoController();
const uXpController = new UsuarioXPermisoController();
//PermisoRouter = express.Router();

//listar todo
PermisoRouter.get("", async (req, res) => {
  const q = req.query;

  const respuesta = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//insertar 1 o varios
PermisoRouter.post("", async (req, res) => {
  const respuesta = await controller.store(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
PermisoRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
PermisoRouter.delete("", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

///////////////////////////////////////////////////////////////
//                      USUARIO  x PERMISO
///////////////////////////////////////////////////////////////
PermisoRouter.post("/usuario", async (req, res) => {
  const respuesta = await uXpController.edit(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

PermisoRouter.put("/usuario/:id", async (req, res) => {
  const respuesta = await uXpController.edit(req.params.id, req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});
PermisoRouter.delete("/usuario", async (req, res) => {
  const respuesta = await uXpController.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});
export { PermisoRouter };
