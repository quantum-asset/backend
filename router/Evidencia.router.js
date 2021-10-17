import express from "express";
import mysql from "mysql";


const EvidenciaRouter = express.Router();

//EvidenciaRouter = express.Router();

//listar todo
EvidenciaRouter.get("/evidencia/:idTomaInventario/:id",(req, res)=>{
});

//insertar 1 o varios
EvidenciaRouter.post("",(req, res)=>{
});

//editar uno
EvidenciaRouter.put("",(req, res)=>{
});

//eliminar 1
EvidenciaRouter.delete("",(req, res)=>{
});

export { EvidenciaRouter };