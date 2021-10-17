import express from "express";
import mysql from "mysql";


const ActivoRouter = express.Router();

//ActivoRouter = express.Router();

//listar todo
ActivoRouter.get("/activo",(req, res)=>{
});
//buscar activos fitlros, por ahora en el front
/* ActivoRouter.get("/activo/:idLocacion/:id",(req, res)=>{
}); */
//insertar 1 o varios
ActivoRouter.post("/activo",(req, res)=>{
});

//editar uno
ActivoRouter.put("/activo/:id",(req, res)=>{
});

//eliminar o dar de baja 1
ActivoRouter.delete("/activo/:id",(req, res)=>{
});

export { ActivoRouter };