import express from "express";
import mysql from "mysql";


const AreaResponsableRouter = express.Router();
//AreaResponsableRouter = express.Router();

//listar todo
AreaResponsableRouter.get("/area-responsable",(req, res)=>{
});

//insertar 1 o varios
AreaResponsableRouter.post("/area-responsable",(req, res)=>{
});

//editar uno
AreaResponsableRouter.put("/area-responsable/:id",(req, res)=>{
});

//eliminar 1
AreaResponsableRouter.delete("/area-responsable/:id",(req, res)=>{
});

export { AreaResponsableRouter };