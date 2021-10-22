export const makeFilterQuery = (
  filtros = { filtrosKeys: [], filtrosValues: [] }
) => {
  const { filtrosKeys, filtrosValues } = filtros;
  let queryFiltros = "";

  if (filtrosKeys.length > 0) {
    queryFiltros = "WHERE";

    //el primero o solo habia 1
    queryFiltros += ` ${filtrosKeys[0]} = ${filtrosValues[0]}`;

    if (filtrosKeys.length > 1) {
      //varios filtros
      for (let i = 1; i < filtrosValues.length; i++) {
        queryFiltros += ` AND ${filtrosKeys[i]} = ${filtrosValues[i]}`;
      }
    }
  }

  return queryFiltros;
};

export const makeUpdateQuery = (
  atributos = { atributosKeys: [], atributosValues: [] }
) => {
  const { atributosKeys, atributosValues } = atributos;
  let queryFiltros = "";

  if (filtrosKeys.length > 0) {
    queryFiltros = "WHERE";

    //el primero o solo habia 1
    queryFiltros += ` ${filtrosKeys[0]} = ${filtrosValues[0]}`;

    if (filtrosKeys.length > 1) {
      //varios filtros
      for (let i = 1; i < filtrosValues.length; i++) {
        queryFiltros += `, ${filtrosKeys[i]} = ${filtrosValues[i]}`;
      }
    }
  }

  return queryFiltros;
};
