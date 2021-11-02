import { v4 as uuidv4 } from "uuid";
import { Scheduler } from "../scheduler.js";

export class RecoverPassword {
  static usuarios = [];
  /**
   * busca en la lista por codigo y confirma si el codigo existe
   * @returns un booleano
   */
  static isValidCode = (code) => {
    console.log("codigos:", RecoverPassword.usuarios);
    console.log("cod:", code);
    let res = RecoverPassword.usuarios.filter((x) => x.codigo === code);
    return res.length > 0 ? res[0].id : false;
  };
  static getCodeById = (id) => {
    if (!id) {
      return "";
    } else {
      const filterList = RecoverPassword.usuarios.filter((x) => x.id === id);
      if (filterList.length > 0) {
        return filterList[0].codigo;
      } else {
        return "";
      }
    }
  };
  /**
   * Agrega a la lista un conjunto de id de usuario y codigo
   *
   * @param {*} id del usuario
   * @param {*} codigoRecuperacion generado
   * @returns true or false, dependiendo del exito de la operacion
   */
  static add = (id, codigoRecuperacion = uuidv4()) => {
    console.log("add code", id, codigoRecuperacion);
    if (!id) {
      return false;
    }
    RecoverPassword.usuarios.push({
      id: id,
      codigo: codigoRecuperacion,
      expiracion: Scheduler.futureDate(), //por default en 24 horas
    });
    return true;
  };
  static remove = (id) => {
    if (!id) {
      return false;
    } else {
      const filterList = RecoverPassword.usuarios.filter((x) => x.id !== id);
      RecoverPassword.usuarios = [...filterList];
      return true;
    }
  };
}
