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
  }
  static sendMessage = async (msj = { message: "" }) => {
    return new Promise((resolve, reject) => {
      try {
        const transporter = nodemailer.createTransport(Mailer.config);
        console.log("OPTIONS:", Mailer.config);
        const mailOptions = {
          from: '"Uchiha Obito " <quantum.asset.mailer@gmail.com>"',
          to: "ginni.tsukino28@gmail.com",
          subject: "Bienvenida", // Subject line
          text: "Quantum asset le da la bienvenida al sistema de gestión de activos", // plain text body
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
}
