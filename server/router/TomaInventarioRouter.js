import express from "express";
import mysql from "mysql";


const TomaInventarioRouter = express.Router();

//TomaInventarioRouter = express.Router();

//listar todas las tomas de inventario
TomaInventarioRouter.get("",(req, res)=>{
});

//Crear toma de inventario
TomaInventarioRouter.post("",(req, res)=>{
});

// Procesar toma de inventario
TomaInventarioRouter.put(":id",(req, res)=>{

});


//eliminar 1
TomaInventarioRouter.delete(":id",(req, res)=>{
});


///////////////////////////////////////////////////////////////
//                          USUARIO x TOMA INVENTARIO
///////////////////////////////////////////////////////////////

//asociar usuarios a una toma de inventario
TomaInventarioRouter.post("/usuario",(req, res)=>{
//array de usuarios para asociar a una toma de inventario
});


///////////////////////////////////////////////////////////////
//                    TOMA INVENTARIO  x     LOCACION 
///////////////////////////////////////////////////////////////

// Asociar locaciones a la toma de inventario
TomaInventarioRouter.post("/locacion",(req, res)=>{
//array de locaciones para asociar a una toma de inventario

});

///////////////////////////////////////////////////////////////
//                      TOMA INVENTARIO  x LOCACION x ACTIVO
///////////////////////////////////////////////////////////////

// Registrar toma de inventario de un activo
TomaInventarioRouter.post("/activo",(req, res)=>{

});

TomaInventarioRouter.post("/activo/evidencia",(req, res)=>{
    //insert into EVIDENCIA, con el id
    //guardar en EFS
    //insert into archivo
});
// Editar toma de inventario de un activo
TomaInventarioRouter.put("/locaciones",(req, res)=>{

});











export { TomaInventarioRouter };