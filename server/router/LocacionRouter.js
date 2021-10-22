import express from "express";
import mysql from "mysql";
import { LocacionController } from "../controller/LocacionController/LocacionController.js";

const LocacionRouter = express.Router();
const controller = new LocacionController();
//LocacionRouter = express.Router();

//listar todo
LocacionRouter.get("/locacion", async (req, res) => {
  let result = await controller.list();
  res.status(200).send(result);
});

//insertar 1 o varios
LocacionRouter.post("/locacion", async (req, res) => {
  //must be an array
  let result = await controller.store(req.body);
  res.status(200).send(result);
});

//editar uno
LocacionRouter.put("/locacion/:id", async (req, res) => {
    let result = await controller.edit(req.params.id,req.body);
    res.status(200).send(result);
});

//eliminar 1
LocacionRouter.delete("", (req, res) => {});

export { LocacionRouter };
