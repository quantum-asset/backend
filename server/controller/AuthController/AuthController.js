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
import { RolController } from "../RolController/RolController.js";
const usuarioController = new UsuarioController();
const sesionController = new SesionController();
const rolController = new RolController();
export class AuthController {
  constructor() {
    this.login = login;
    this.requestRecoverPassword = requestRecoverPassword;
    this.recoverPassword = recoverPassword;
    this.refreshSesion = refreshSesion;
    this.checkCode = checkCode;
  }
}
const login = async ({ CORREO, CONTRASENIA }) => {
  console.log("CORREO", CORREO);
  console.log("CONTRASENIA", CONTRASENIA);

  return new Promise(async (resolve, reject) => {
    //select de usuario por correo
    if (!CORREO || !CONTRASENIA) {
      resolve(Response.error("No se ingreso el correo o contraseña"));
    }
    if (CORREO.length === 0 || CONTRASENIA.length === 0) {
      resolve(
        Response.error("El correo o contraseña debe tener longitud mayor a 6")
      );
    }
    const usuarios = await usuarioController.list({
      filtrosKeys: ["CORREO", "ESTADO"],
      filtrosValues: [`'${CORREO}'`, 1],
    });

    console.log("usuarios: ", usuarios);

    // hasheo el password del request
    if (usuarios.payload.length === 0) {
      resolve(Response.error("El usuario o contraseña no coincide"));
    }

    const usuario = usuarios.payload[0];
    const passwordFromDB = usuario.CONTRASENIA;

    //comparo
    if (Hasher.compare(CONTRASENIA, passwordFromDB)) {
      //son iguales
      //reviso si ya tiene una sesión activa,
      //futuro XD

      //sino, le creo una sesion
      const SESION = await sesionController.store([
        { ID_USUARIO: usuario.ID_USUARIO },
      ]);
      console.log("SESION: ", SESION);

      const ROL = await rolController.list({
        filtrosKeys: ["ID_ROL"],
        filtrosValues: [usuario.ID_ROL],
      });
      //Busco su rol y permisos
      console.log("ROL: ", ROL);

      //retorno la sesion  con el token y al usuario
      resolve(
        Response.ok(
          "ok",
          { ...usuario, sesion: SESION.payload, rol: ROL.payload },
          "Inicio de sesión correcto"
        )
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
  console.log("Request:", CORREO);
  return new Promise(async (resolve, reject) => {
    //select de usuario por correo
    const usuariosPre = await usuarioController.list({
      filtrosKeys: ["CORREO"],
      filtrosValues: [`"${CORREO}"`],
    });
    const usuarios = JSON.parse(JSON.stringify(usuariosPre)).payload;
    console.log("usuariossssss", usuarios.payload);
    if (usuarios.length > 0) {
      const codigoRecuperacion = Hasher.random();
      //enviar por correo
      const response = await Mailer.sendRecoveryCode(
        CORREO,
        codigoRecuperacion
      );
      //console.log("resposneeee", response);
      if (response) {
        //no es falso, osea ok
        //si se envio bien lo guardo en memoria
        const addedRecoveryClass = RecoverPassword.add(
          usuarios[0].ID_USUARIO,
          codigoRecuperacion
        );

        if (!addedRecoveryClass) {
          resolve(
            Response.error(
              "Error al generar código de recuperación, por favor intentelo nuevamente"
            )
          );
        }
        //en caso se haya enviado

        resolve(
          Response.ok(
            "ok",
            {},
            "Se ha enviado instrucciones para reestablecer su contraseña a " +
              CORREO
          )
        );
      } else {
        resolve(
          Response.error(
            "Error al enviar correo de recuperación, por favor intentelo nuevamente"
          )
        );
      }
    } else {
      console.log("Nose encontro usuario");
      resolve(
        Response.ok(
          "error",
          {},
          "El coreo ingresado no se encuentra registrado en nuestra base de datos"
        )
      );
    }
  });
};
const checkCode = async (codigoRecuperacion) => {
  return new Promise(async (resolve, reject) => {
    const idIfValid= RecoverPassword.isValidCode(codigoRecuperacion);
    if (idIfValid) {
      resolve(Response.ok("ok", {ID:idIfValid}, "Codigo correcto y existente"));
    } else {
      resolve(
        Response.error(
          "Codigo incorrecto o expirado, por favor vuelva a solicitar reestablecimiento de contraseña"
        )
      );
    }
  });
};
const recoverPassword = async (codigoRecuperacion) => {
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
