export const ARCHICO_MOCK = (
  ID_ARCHIVO,
  TIPO_ARCHIVO,
  RUTA,
  FECHA_CREACION,
  ULTIMA_MODIFICACION,
  ESTADO = 1
) => {
  return {
    ID_ARCHIVO,
    TIPO_ARCHIVO,
    RUTA,
    FECHA_CREACION,
    ULTIMA_MODIFICACION,
    ESTADO,
  };
};