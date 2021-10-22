import express from "express";
import { newResponse } from "../response/Response.js";


const AuthRouter = express.Router();

//AuthRouter = express.Router();

//listar todo
AuthRouter.post("/login",(req, res)=>{
    const {CORREO, CONTRASENIA} = req.body;
    if(!CORREO || !CONTRASENIA){
        res.status(500).send(newResponse("error"));
        return;
    }

    //buscar usuario con select y correo

    //comparar password
    //el user.passwors esta en hash
    //hasheo lo que recibo CONTRASENIA y comparo strings
    //si es igual retorno un ok, sino un error
    // si es ok mando correo con codigo

    //crear sesion y devolver tambien ese ID SESION para refrescar
});

//insertar 1 o varios
AuthRouter.post("/recuperar",(req, res)=>{
    const {CORREO} = req.body;
    if(!CORREO){
        res.status(500).send(newResponse("error",{},"No ha ingresado un correo"));
        return;
    }

    //buscar usuario con select y correo

    // await enviar el correo, oajala sea sincrono

    res.send(200).send(newResponse("ok",{},"Se envio un mensaje al correo indicado"));
    

});

AuthRouter.post("/recuperar/:codigo",(req, res)=>{
    const {codigo} = req.params;
    if(!codigo){
        res.status(500).send(newResponse("error"),{},"No ha enviado el codigo");
    }
    const {CORREO, CONTRASENIA} = body;
    //buscar usuario con select y correo

    //comparar password
    //el user.passwors esta en hash
    //hasheo lo que recibo CONTRASENIA y comparo strings
    //si es igual retorno un ok, sino un error
    // si es ok mando correo con codigo
});

///  SESIOM
AuthRouter.put("/sesion/:id", async (req, res) => {
  const { id } = req.params;
});

export { AuthRouter };