import { SesionController } from "../server/controller/SesionController/SesionController.js";
import { RecoverPassword } from "./RecoverPassword/RecoverPassword.js";
import sleep from "./waterfall/sleep.js";
const sesionController = new SesionController();
export class Scheduler {
  constructor() {
    this.sleep = sleep;
    this.checkExpiredSesion = checkExpiredSesion;
    this.refreshCodigosRecuperacion = refreshCodigosRecuperacion;
  }
  static futureDate = (mins = 24 * 60) => {
    const oldDateObj = new Date();

    let newDateObj = new Date(oldDateObj.getTime() + mins * 60000);
    return newDateObj;
  };
}

/**
 * Checar las sesiones activas si no expiraron
 * en un lapso de 5 minutos
 * 5000 milisegundos
 * @param {*} time
 */
const checkExpiredSesion = async (time = 15000) => {
  while (true) {
    await sleep(time);
    console.log("checkExpiredSesion");

    // get list of active sessions
    const listOfSesions = await sesionController.list();
    const sesionesSinRowDataPacket = JSON.parse(JSON.stringify(listOfSesions)).payload;
    console.log("sesionesSinRowDataPacket", sesionesSinRowDataPacket);
    for (let i = 0; i < sesionesSinRowDataPacket.length; i++) {
      const currentSesion = sesionesSinRowDataPacket[i];
      const currentSesionDate = new Date(currentSesion.EXPIRACION);
      const currentDateNow = new Date();
      //debo parsear este string
      if (currentSesionDate.getTime() - currentDateNow.getTime() < 0) {
        //ya expiró, entonces lo borro
        await sesionController.remove(currentSesion.ID_SESION);
      }
    }
    // compare for each one if expiration date is
    //
  }
};

const refreshCodigosRecuperacion = async (time = 15000) => {
  while (true) {
    await sleep(time);
    console.log("refreshCodigosRecuperacion");
    // get list of active sessions
    const listOfUsersAndCodes = RecoverPassword.usuarios;
    for (let i = 0; i < listOfUsersAndCodes.length; i++) {
      const currentUsuario = listOfSesions[i];
      const currentUsuarioDate = new Date(currentUsuario.expiracion);
      const currentDateNow = new Date();
      if (currentUsuarioDate.getTime() - currentDateNow.getTime() < 0) {
        //ya expiró, entonces lo borro
        RecoverPassword.remove(currentUsuario.id);
      }
    }
  }
};
