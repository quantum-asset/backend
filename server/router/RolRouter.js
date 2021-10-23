import express from "express";
import mysql from "mysql";


const RolRouter = express.Router();

//RolRouter = express.Router();

//listar todo
RolRouter.get("",(req, res)=>{
});

//insertar 1 o varios
RolRouter.post("",(req, res)=>{
});

//editar uno
RolRouter.put(":id",(req, res)=>{
});

//eliminar 1
RolRouter.delete("",(req, res)=>{
});

export { RolRouter };