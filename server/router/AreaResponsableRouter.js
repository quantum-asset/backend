import express from "express";


const AreaResponsableRouter = express.Router();

//AreaResponsableRouter = express.Router();

//listar todo
AreaResponsableRouter.get("",(req, res)=>{
});

//insertar 1 o varios
AreaResponsableRouter.post("",(req, res)=>{
});

//editar uno
AreaResponsableRouter.put("/:id",(req, res)=>{
});

//eliminar 1
AreaResponsableRouter.delete("/:id",(req, res)=>{
});

export { AreaResponsableRouter };