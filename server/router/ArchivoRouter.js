import express from "express";
import mysql from "mysql";


const ArchivoRouter = express.Router();

//ArchivoRouter = express.Router();

//listar todo
ArchivoRouter.get("/archivo/:id",(req, res)=>{
});

//insertar 1 o varios
ArchivoRouter.post("/archivo",(req, res)=>{
});

//editar uno
ArchivoRouter.put("/archivo",(req, res)=>{
});

//editar uno
ArchivoRouter.patch("/archivo",(req, res)=>{
});

//eliminar 1
ArchivoRouter.delete("/archivo/:id",(req, res)=>{
});

export { ArchivoRouter };