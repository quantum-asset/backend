import express from "express";
import { ActivoController } from "../controller/ActivoController/ActivoController.js";

const ActivoRouterRouter = express.Router();
const controller = new ActivoController();
//ActivoRouterRouter = express.Router();

//listar todo
ActivoRouterRouter.get("", async (req, res) => {
  try {
    const q = req.query;
    const respuesta = await controller.list({
      filtrosKeys: Object.keys(q),
      filtrosValues: Object.values(q),
    });
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});
//contar por ID_LOCACION
ActivoRouterRouter.get("/cuenta/:ID_LOCACION", async (req, res) => {
  try {
    const { ID_LOCACION } = req.params;
    console.log("ID_LOCACION", ID_LOCACION);
    const respuesta = await controller.counter(ID_LOCACION);
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});
//insertar 1 o varios
ActivoRouterRouter.post("", async (req, res) => {
  try {
    //must be an array
    const respuesta = await controller.store(req.body);

    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
ActivoRouterRouter.put("/:id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
ActivoRouterRouter.delete("", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { ActivoRouterRouter };
