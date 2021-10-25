import { v4 as uuidv4 } from "uuid";
import { Scheduler } from "../scheduler.js";

export class RecoverPassword {
  static usuarios = [];
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
    if (!id) {
      return false;
    }
    RecoverPassword.usuarios.push({
      id: id,
      codigo: codigoRecuperacion,
      expiracion: Scheduler.futureDate(),//por default en 24 horas
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
