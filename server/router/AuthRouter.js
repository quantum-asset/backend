import express from "express";
import { AuthController } from "../controller/AuthController/AuthController.js";

const AuthRouter = express.Router();
const controller = new AuthController();
//AuthRouter = express.Router();

//listar todo
AuthRouter.get("", async (req, res) => {
  res.send({ message: "Tenemos sus coordenadas de geolocalización" });
});

/**
 * iniciar sesion
 * comprobar usuario y contraseña
 * crear sesion
 * retornar usuario y sesion en un solo objeto
 */
AuthRouter.post("/login", async (req, res) => {
  const respuesta = await controller.login(req.body);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

/**
 * Enviar la solicitud de recuperacion
 * Solo recibe el correo y a esa direccion se le envia un codio y un link
 */
AuthRouter.post("/recover", async (req, res) => {
  const respuesta = await controller.requestRecoverPassword(req.body.CORREO);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});
//editar uno
AuthRouter.post("/recover/:id", async (req, res) => {
  const respuesta = await controller.recoverPassword(req.params.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { AuthRouter };
