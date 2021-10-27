import { Response } from "../response/Response.js";
/**
 * Middleware para recibir el token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const verifyToken = (req, res, next) => {
  //obtener
  const bearerHeader = req.headers["authorization"];
  console.log("recibi como token", bearerHeader);
  /* if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const beareToken = bearer[1];
    req.token = beareToken;
    next();
  } else {
    res
      .status(403)
      .send(Response.error("Acceso no autorizado", { logout: true }));
  } */

  next();
};
