import sha256 from "js-sha256";

import { v4 as uuidv4 } from "uuid";

/**
 * Reads an image file in a promise way, so you can use await.
 * If other kind of file is sent, this function will read it anyway
 * and will return a string that contains the URL representation
 * @param file File image object
 * @returns data URL of the image file
 */
export const readImagePromise = (file) => {
  console.log("START", file);

  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        console.log("LOAD");
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      resolve(undefined);
    }
  });
};
/**
 * Hash from MDN
 * @param {*} message
 * @returns
 */

export class Hasher {
  constructor() {
    Hasher.encode = encode;
    Hasher.compare = compare;
    Hasher.random = random;
    Hasher.token = token;
  }
  /**
   * Codifica el mensaje en 128 caracteres
   * @param {*} message
   * @returns
   */
  static encode = (message = "") => {
    let hasher = sha256.create();
    hasher.update(message);
    hasher.hex();
    return hasher.hex() + hasher.hex();
  };
  /**
   *  Decodifica el mensaje en 128 caracteres
   * para comprobar si es igual al mensaje enviado
   * @param {*} message el mensaje a comprobar si corresponde al mensaje hasheado
   * @param {*} hashedMessage el mensake hasheado
   */
  static compare = (message = "", hashedMessage = "") => {
    let hasher = sha256.create();
    hasher.update(message);
    hasher.hex();
    const messageHash = hasher.hex() + hasher.hex();
    return messageHash === hashedMessage;
  };
  static random = () => {
    const uuid = uuidv4();
    console.log(uuid);
    return Hasher.encode(uuid);
  };
  static token = () => {
    return uuidv4();
  };
}
