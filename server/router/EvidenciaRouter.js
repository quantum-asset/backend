import express from "express";


const EvidenciaRouter = express.Router();

//EvidenciaRouter = express.Router();

//listar todo
EvidenciaRouter.get("",(req, res)=>{
});

//insertar 1 o varios
EvidenciaRouter.post("",(req, res)=>{
});

//editar uno
EvidenciaRouter.put("/:id",(req, res)=>{
});

//eliminar 1
EvidenciaRouter.delete("/:id",(req, res)=>{
});

export { EvidenciaRouter };