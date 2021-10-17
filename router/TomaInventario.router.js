import express from "express";
import mysql from "mysql";


const TomaInventarioRouter = express.Router();

//TomaInventarioRouter = express.Router();

//listar todas las tomas de inventario
TomaInventarioRouter.get("/toma-inventario",(req, res)=>{
});

//Crear toma de inventario
TomaInventarioRouter.post("/toma-inventario",(req, res)=>{
});

// Procesar toma de inventario
TomaInventarioRouter.put("/toma-inventario",(req, res)=>{

});


//eliminar 1
TomaInventarioRouter.delete("/toma-inventario",(req, res)=>{
});


///////////////////////////////////////////////////////////////
//                          USUARIO x TOMA INVENTARIO
///////////////////////////////////////////////////////////////

//asociar usuarios a una toma de inventario
TomaInventarioRouter.post("/toma-inventario/usuarios",(req, res)=>{

});


///////////////////////////////////////////////////////////////
//                    TOMA INVENTARIO  x     LOCACION 
///////////////////////////////////////////////////////////////

// Asociar locaciones a la toma de inventario
TomaInventarioRouter.post("/toma-inventario/locaciones",(req, res)=>{

});

///////////////////////////////////////////////////////////////
//                      TOMA INVENTARIO  x LOCACION x ACTIVO
///////////////////////////////////////////////////////////////

// Registrar toma de inventario de un activo
TomaInventarioRouter.post("/toma-inventario/activo",(req, res)=>{

});

TomaInventarioRouter.post("/toma-inventario/activo/evidencia",(req, res)=>{

});
// Editar toma de inventario de un activo
TomaInventarioRouter.put("/toma-inventario/locaciones",(req, res)=>{

});











export { TomaInventarioRouter };