import express from "express";
import mysql from "mysql";


const NecesidadTagRouter = express.Router();

//NecesidadTagRouter = express.Router();

//listar todo
NecesidadTagRouter.get("",(req, res)=>{
});

//insertar 1 o varios
NecesidadTagRouter.post("",(req, res)=>{
});

//editar uno
NecesidadTagRouter.put("/:id",(req, res)=>{
    const {id} = req.params;
});

//eliminar 1
NecesidadTagRouter.delete("/:id",(req, res)=>{
    const {id} = req.params;

});

export { NecesidadTagRouter };