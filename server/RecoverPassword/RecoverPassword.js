import { v4 as uuidv4 } from "uuid";

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
  static add = (id) => {
    if (!id) {
      return false;
    }
    RecoverPassword.usuarios.push({ id: id, codigo: uuidv4() });
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
