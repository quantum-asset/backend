export const SESION_MOCK = (
  ID_SESION,
  ID_USUARIO,
  TOKEN,
  EXPIRACION,
  ESTADO = 1
) => {
  return { ID_SESION, ID_USUARIO, TOKEN, EXPIRACION, ESTADO };
};
