export const usuario_insert_sql = (
  //ID_USUARIO,
  ID_LOCACION,
  CORREO,
  CONTRASENIA,
  NOMBRES,
  APELLIDO_PATERNO,
  APELLIDO_MATERNO,
  ROL,
  TIPO_DOCUMENTO_IDENTIDAD,
  NUM_DOCUMENTO_IDENTIDAD
) =>
  `INSERT INTO USUARIO
(
ID_LOCACION,
CORREO,
CONTRASENIA,
NOMBRES,
APELLIDO_PATERNO,
APELLIDO_MATERNO,
ROL,
TIPO_DOCUMENTO_IDENTIDAD,
NUM_DOCUMENTO_IDENTIDAD)
VALUES
(

${ID_LOCACION},
${CORREO},
${CONTRASENIA},
${NOMBRES},
${APELLIDO_PATERNO},
${APELLIDO_MATERNO},
${ROL},
${TIPO_DOCUMENTO_IDENTIDAD},
${NUM_DOCUMENTO_IDENTIDAD})`;
