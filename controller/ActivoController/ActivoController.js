import { conector } from "../../mysql_conector";
import { activo_insert_sql } from "./ActivoSentencias";

export const crearActivo = (activo) => {
  const {
    TAG,
    FOTO,
    TIPO_ACTIVO,
    ID_LOCACION,
    ID_AREA_RESPONSABLE,
    DENOMINACION,
    CARACTERISTICAS,
    OBSERVCIONES,
    PROVEEDOR_RUC,
    SERIE,
    COLOR,
    MODELO,
    MARCA,
    COSTO_ADQUISICION,
    DEPRECIACION,
    VALOR_LIBROS,
    FECHA_DE_ALTA,
    NUM_GUIA_REMISION,
    NUM_FACTURA,
    PROVEEDOR_RAZON_SOCIAL,
  } = activo;

  const { ID_TAG, CODIGO, LOCACION, USUARIO } = TAG;
  const { ID_FOTO, CODIGO, LOCACION, USUARIO } = FOTO;
  const { ID_TIPO_ACTIVO, CODIGO, LOCACION, USUARIO } = TIPO_ACTIVO;
  const sql = activo_insert_sql(
    ID_TAG,
    ID_FOTO,
    ID_TIPO_ACTIVO,
    ID_LOCACION,
    ID_AREA_RESPONSABLE,
    DENOMINACION,
    CARACTERISTICAS,
    OBSERVCIONES,
    PROVEEDOR_RUC,
    SERIE,
    COLOR,
    MODELO,
    MARCA,
    COSTO_ADQUISICION,
    DEPRECIACION,
    VALOR_LIBROS,
    FECHA_DE_ALTA,
    NUM_GUIA_REMISION,
    NUM_FACTURA,
    PROVEEDOR_RAZON_SOCIAL
  );
  conector.query(sql, (err, results, fileds) => {
    if (err) throw err;
    console.log("results", results);
    console.log("fileds", fileds);
  });
};
