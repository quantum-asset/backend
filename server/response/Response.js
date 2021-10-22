export const newResponse = (status, payload, message) => {
  return {
    status,
    payload,
    message,
    timestamp: new Date(),
  };
};

export class Response {
  static ok = (status="ok", payload={}, message="ok") => {
    return {
      status,
      payload,
      message,
      timestamp: new Date(),
    };
  };
  static errorInesperado = () => {
    return {
      status: "error",
      payload: {},
      message: "Ocurrió un error inesperado",
      timestamp: new Date(),
    };
  };
  static error = (error = "Error en la operacion", payload = {}) => {
    return {
      status: "error",
      payload,
      message: error,
      timestamp: new Date(),
    };
  };
}
