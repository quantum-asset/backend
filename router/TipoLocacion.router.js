import express from "express";
import mysql from "mysql";
const TipoLocacionRouter = express.Router();
//listar todo
TipoLocacionRouter.get("/tipo-locacion",(req, res)=>{
});

//insertar 1 o varios
TipoLocacionRouter.post("/locacion",(req, res)=>{

});

//editar locacion
TipoLocacionRouter.put("/locacion",(req, res)=>{

});
//eliminar locacion
TipoLocacionRouter.delete("/locacion",(req, res)=>{

});


export { TipoLocacionRouter };
