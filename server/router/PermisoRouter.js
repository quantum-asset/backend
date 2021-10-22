import express from "express";
import mysql from "mysql";


const PermisoRouter = express.Router();

//PermisoRouter = express.Router();

//listar todo
PermisoRouter.get("",(req, res)=>{
});

//insertar 1 o varios
PermisoRouter.post("",(req, res)=>{
});

//editar uno
PermisoRouter.put("/:id",(req, res)=>{
    const{id} = req.params;
});

//eliminar 1
PermisoRouter.delete(":id",(req, res)=>{
    const{id} = req.params;

});

///////////////////////////////////////////////////////////////
//                      USUARIO  x PERMISO
///////////////////////////////////////////////////////////////
PermisoRouter.post("/usuario",async (req,res)=>{

});

export { PermisoRouter };