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
  console.log("body", req.body);
  console.log("params", req.params);
  console.log("query", req.query);
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
  /*  const { CODIGO } = req.body;
 console.log("CODE /recover=>", CODIGO);
 const respuesta = { snet: CODIGO }; */
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

/**
 * Verificar si el codigo existe y es correcto
 */
AuthRouter.post("/recover/check", async (req, res) => {
  /* const { CODIGO } = req.body;
  console.log("CODE check =>", CODIGO);
  const respuesta = { snet: CODIGO };
   */
  const respuesta = await controller.checkCode(req.body.CODIGO);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//editar uno
AuthRouter.post("/recover/:id", async (req, res) => {
  //const respuesta = await controller.recoverPassword(req.params.id);
  const { CODIGO } = req.body;
  console.log("CODE :id=>", CODIGO);
  const respuesta = { snet: CODIGO };
  if (respuesta) {
    //res.status(200).send(respuesta);
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { AuthRouter };
