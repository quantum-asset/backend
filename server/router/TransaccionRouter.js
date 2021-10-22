import express from "express";


const TransaccionRouter = express.Router();

//TransaccionRouter = express.Router();

//listar todo
TransaccionRouter.get("",(req, res)=>{
});

//insertar 1 o varios
TransaccionRouter.post("",(req, res)=>{
});

//editar uno
TransaccionRouter.put("/:id",(req, res)=>{
});

//eliminar 1
TransaccionRouter.delete("/:id",(req, res)=>{
});


///////////////////////////////////////////////////////////////
//                      USUARIO  x TRANSaACIION
//                           TRAZABILIDAD
///////////////////////////////////////////////////////////////
TransaccionRouter.post("/usuario",async (req,res)=>{

});

export { TransaccionRouter };