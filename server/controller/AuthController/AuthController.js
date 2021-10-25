import { Response } from "../../response/Response.js";
import {
  makeFilterQuery,
  makeUpdateQuery,
} from "../UtilsController/UtilsController.js";
import { connectMysql } from "../../mysql_conector.js";
import { UsuarioController } from "../UsuarioController/UsuarioController.js";
import { Hasher } from "../../../utils/utils.js";
import { SesionController } from "../SesionController/SesionController.js";
import { Mailer } from "../../../utils/mailer.js";
import { RecoverPassword } from "../../../utils/RecoverPassword/RecoverPassword.js";
const usuarioController = new UsuarioController();
const sesionController = new SesionController();
export class AuthController {
  constructor() {
    this.login = login;
    this.requestRecoverPassword = requestRecoverPassword;
    this.recoverPassword = recoverPassword;
    this.refreshSesion = refreshSesion;
  }
}
const login = async ({ CORREO, CONTRASENIA }) => {
  return new Promise(async (resolve, reject) => {
    //select de usuario por correo
    const usuarios = await usuarioController.list({
      filtrosKeys: ["CORREO"],
      filtrosValues: [CORREO],
    });
    const usuario = usuarios[0];
    const passwordFromDB = usuario.CONTRASENIA;

    // hasheo el password del request
    if (usuarios.length === 0) {
      resolve(Response.error("El usuario o contraseña no coincide"));
    }
    //comparo
    if (Hasher.compare(CONTRASENIA, passwordFromDB)) {
      //son iguales
      //creo una sesion
      const { payload } = sesionController.store([
        { ID_USUARIO: usuario.ID_USUARIO },
      ]);
      //retorno la sesion  con el token y al usuario
      resolve(
        Response.ok("ok", { ...usuario, payload }, "Inicio de sesión correcto")
      );
    } else {
      resolve(Response.error("La contraseña no coincide"));
      //no coincide
    }
  });
};
/**
 * Solicitar recuperacion de contraseña
 * @param {*} CORREO el correo al cual enviar el codigo
 * @returns
 */
const requestRecoverPassword = async (CORREO) => {
  return new Promise(async (resolve, reject) => {
    //select de usuario por correo
    const usuarios = await usuarioController.list({
      filtrosKeys: ["CORREO"],
      filtrosValues: [CORREO],
    });
    if (usuarios.length > 0) {
      const codigoRecuperacion = Hasher.random();
      //enviar por correo
      const response = Mailer.sendRecoveryCode(CORREO, codigoRecuperacion);

      if (response) {
        //no es falso, osea ok
        //si se envio bien lo guardo en memoria
        const addedRecoveryClass = RecoverPassword.add(usuarios[0].ID_USUARIO);
        if (!addedRecoveryClass) {
          resolve(
            Response.error(
              "Error al generar código de recuperación, por favor intentelo nuevamente"
            )
          );
        }
        resolve(
          Response.ok(
            "ok",
            {},
            "Si el correo ingresado está registrado se enviarán instrucciones de recuperación"
          )
        );
      } else {
        resolve(
          Response.error(
            "Error al enviar correo de recuperación, por favor intentelo nuevamente"
          )
        );
      }
    }
    resolve(
      Response.ok(
        "ok",
        {},
        "Si el correo ingresado está registrado se enviarán instrucciones de recuperación"
      )
    );
  });
};

const recoverPassword = (codigoRecuperacion) => {
  return new Promise(async (resolve, reject) => {
    //select de usuario por correo
    const usuario = await usuarioController.list({
      filtrosKeys: ["ID_USUARIO"],
      filtrosValues: [ID_USUARIO],
    });
    // saco el ID

    //comparo el codigo en la lista de de usuario por recuperar password

    // hasheo el password del request

    //comparo

    //si es igual

    //        seteo sesion
    //        resolve con usuario
  });
};

const refreshSesion = ({ ID_USUARIO, TOKEN }) => {
  return new Promise((resolve, reject) => {
    //select de usuario por correo
    //comparo el password.hash
    // hasheo el password del request
    //comparo
    //si es igual
    //        seteo sesion
    //        resolve con usuario
  });
};
