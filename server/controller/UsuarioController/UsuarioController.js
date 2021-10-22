export const iniciarSesion = (body) => {
  if (!body) {
    return {
      status: "fail",
      timeStamp: new Date(),
      message: "No se adjuntaron los datos",
      payload: {},
    };
  }
  const { correo, contrasenia } = body;
  if (!correo || !contrasenia) {
    return {
      status: "fail",
      timeStamp: new Date(),
      message: "Correo o contraseña no fueron ingresados",
      payload: {},
    };
  }
  if (correo === "encargado_control") {
    return {
      status: "ok",
      timeStamp: new Date(),
      message: "Inicio de sesion exitoso",
      payload: ENCARGADO_CONTROL,
    };
  } else if (correo === "encargado_toma") {
    return {
      status: "ok",
      timeStamp: new Date(),
      message: "Inicio de sesion exitoso",
      payload: ENCARGADO_TOMA,
    };
  } else {
    return {
      status: "fail",
      timeStamp: new Date(),
      message: "Correo o contraseña ingresados incorrectamente",
      payload: {},
    };
  }
};

const ENCARGADO_CONTROL = {
  ID_USUARIO: 4156,
  ID_LOCACION: 64,
  CORREO: "encargado_control@quantumasset.com",
  NOMBRES: "Sofia Elena",
  APELLIDO_PATERNO: "Del Rio",
  APELLIDO_MATERNO: "Jimenez",
  TIPO_DOCUMETNTO: "DNI",
  NUM_DOCUMENTO_IDENTIDAD: "6196516546",
};
const ENCARGADO_TOMA = {
  ID_USUARIO: 336,
  ID_LOCACION: 4,
  CORREO: "encargado_toma@quantumasset.com",
  NOMBRES: "Aylen",
  APELLIDO_PATERNO: "Huaite",
  APELLIDO_MATERNO: "Gonzales",
  TIPO_DOCUMETNTO: "DNI",
  NUM_DOCUMENTO_IDENTIDAD: "9846161966",
};
