import express from "express";
import mysql from "mysql";
import { ActivoController } from "../controller/ActivoController/ActivoController.js";
import { newResponse } from "../response/Response.js";

const ActivoRouter = express.Router();

//ActivoRouter = express.Router();

//listar todo
ActivoRouter.get("/activo", (req, res) => {
  const sql = "SELECT * FROM ACTIVO;";
});
//buscar activos fitlros, por ahora en el front
/* ActivoRouter.get("/activo/:idLocacion/:id",(req, res)=>{
}); */
//insertar 1 o varios
ActivoRouter.post("/activo", async (req, res) => {
  const controller = new ActivoController();

  const respuesta = await controller.store(req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});

//editar uno
ActivoRouter.put("/activo/:id", async(req, res) => {
  const { id } = req.params;
  const controller = new ActivoController();

  const respuesta = await controller.edit(id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res
      .status(500)
      .send(newResponse("error", {}, "Ocurrió un error inesperado"));
  }
});

//eliminar o dar de baja 1
ActivoRouter.delete("/activo/:id", (req, res) => {});

export { ActivoRouter };
