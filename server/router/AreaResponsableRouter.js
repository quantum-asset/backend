import express from "express";
import { AreaResponsableController } from "../controller/AreaResponsableController/AreaResponsableController";


const AreaResponsableRouter = express.Router();
const controller = new AreaResponsableController();

//AreaResponsableRouter = express.Router();

//listar todo
AreaResponsableRouter.get("", async (req, res)=>{
    const respuesta = await controller.list();

    if (respuesta) {
      res.status(200).send(respuesta);
    } else {
      res.status(500).send(Response.error("Ocurrió un error inesperado"));
    }
});

//insertar 1 o varios
AreaResponsableRouter.post("", async (req, res)=>{
    const respuesta = await controller.store(req.body);
    if (respuesta) {
      res.status(200).send(respuesta);
    } else {
      res.status(500).send(Response.error("Ocurrió un error inesperado"));
    }
});

//editar uno
AreaResponsableRouter.put("/:id", async (req, res)=>{
    const respuesta = await controller.edit(req.params.id, req.body);

    if (respuesta) {
      res.status(200).send(respuesta);
    } else {
      res.status(500).send(Response.error("Ocurrió un error inesperado"));
    }
});

//eliminar 1
AreaResponsableRouter.delete("", async (req, res)=>{
    const respuesta = await controller.remove(req.query.id);
    if (respuesta) {
      res.status(200).send(respuesta);
    } else {
      res.status(500).send(Response.error("Ocurrió un error inesperado"));
    }
});

export { AreaResponsableRouter };