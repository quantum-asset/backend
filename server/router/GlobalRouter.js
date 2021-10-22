import express from "express";


const GlobalRouter = express.Router();

//GlobalRouter = express.Router();

//listar todo
GlobalRouter.get("", async (req, res)=>{
});

//insertar 1 o varios
GlobalRouter.post("", async (req, res)=>{
});

//editar uno
GlobalRouter.put("/:id", async (req, res)=>{
});

//eliminar 1
GlobalRouter.delete("/:id", async (req, res)=>{
});

export { GlobalRouter };