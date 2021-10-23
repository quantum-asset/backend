export const LOCACION_MOCK = (
  ID_LOCACION,
  ID_TIPO_LOCACION,
  DIRECCION,
  DENOMINACION,

  DESCRIPCION = "-",
  ESTADO = 1
) => {
  return {
    ID_LOCACION,
    ID_TIPO_LOCACION,
    DIRECCION,
    DENOMINACION,

    DESCRIPCION,
    ESTADO,
  };
};