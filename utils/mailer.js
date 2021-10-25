//var nodemailer = require('nodemailer');

//import { nodemailer } from "nodemailer";
import nodemailer from "nodemailer";
export class Mailer {
  static config = {
    service: "gmail",
    auth: {
      user: "quantum.asset.mailer@gmail.com",
      pass: "Quantum.Password01",
    },
  };
  constructor() {
    Mailer.sendMessage = sendMessage;
    Mailer.sendRecoveryCode=sendRecoveryCode;
  }
  static sendMessage = async (msj = { message: "" }) => {
    return new Promise((resolve, reject) => {
      try {
        const transporter = nodemailer.createTransport(Mailer.config);
        console.log("OPTIONS:", Mailer.config);
        const mailOptions = {
          from: '"Obito Uchiha" <quantum.asset.mailer@gmail.com>"',
          to: "161874@unsaac.edu.pe",
          subject: "Bienvenida", // Subject line
          text: "Quantum asset le da la bienvenida al sistema de gestión de activos, por facor para activar su cuenta cambie su contraseña desde la página principal https://www.quantum-asset.com o directamente desde este link: https://www.quantum-asset.com/recover/sdsdf651sd65f1sd6f5wef", // plain text body
          // html: "<p>Estimado usuario, se ha registrado satisfactoriamente</p>", // html body
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            resolve(error);
          } else {
            resolve(info);
          }
        });
      } catch (error) {
        resolve(error);
      }
    });
  };
  static sendRecoveryCode=(correo, codigoRecuperacion)=>{
    if(!correo || !codigoRecuperacion){
      return false;
    }else{
      return new Promise((resolve, reject) => {
        try {
          const transporter = nodemailer.createTransport(Mailer.config);
          //console.log("OPTIONS:", Mailer.config);
          const mailOptions = {
            from: '"Obito Uchiha" <quantum.asset.mailer@gmail.com>"',
            to: correo,
            subject: "RECUPERACION DE CONTRASEÑA EN QUANTUM ASSET", // Subject line
            text: `Se ha solicitado la recuperación de su contraseña para acceder.
            Este es el codigo que debe ingresar: ${codigoRecuperacion}
            Si no fue usted, porfavor omitir el correo.
            Caso contrario también puede recuperar su contraseña directamente a través del siguiente enlace:
            http://www.quantum-asset.com/recuperar-contrasenia/${codigoRecuperacion}`, // plain text body
            // html: "<p>Estimado usuario, se ha registrado satisfactoriamente</p>", // html body
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("error",error);
              resolve(false);
            } else {
              resolve(info);
            }
          });
        } catch (error) {
          resolve(error);
        }
      });
    }
  }
}
/**
 * CORREO DE CONFIRMACION DE REGISTRO Y SOLICITUD DE CAMBIO DE CONTRASEÑA
 *
 * CORREO CON EL CODIGO--------->  WWW.URL/recover/<codigo>
 *
 * CAMBIO SATISFACTORIO DE PASSWORD --------->  WWW.URL/recover/<codigo>
 *
 * GENERACION DE ALERTA DE DESABASTECIMINETO, UN MINIMO (globales), POR DEFECTO VA A SER CERO
 *          se llega al minimo  o se envia manualmente la alterta =()=> agregar un mensaje
 */
