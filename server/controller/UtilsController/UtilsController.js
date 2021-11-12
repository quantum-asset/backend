export const makeFilterQuery = (
  filtros = { filtrosKeys: [], filtrosValues: [] },
  alias
) => {
  const { filtrosKeys, filtrosValues } = filtros;
  let queryFiltros = "";
  //console.log("alias", alias);
  if (filtrosKeys.length > 0) {
    queryFiltros = " WHERE";

    //el primero o solo habia 1
    if (alias) {
      queryFiltros += ` ${alias}.${filtrosKeys[0]} = ${filtrosValues[0]}`;
    } else {
      queryFiltros += ` ${filtrosKeys[0]} = ${filtrosValues[0]}`;
    }
    if (filtrosKeys.length > 1) {
      //varios filtros
      
      for (let i = 1; i < filtrosValues.length; i++) {
        if (alias) {
          queryFiltros += ` AND ${alias}.${filtrosKeys[i]} = ${filtrosValues[i]}`;
        } else {
          queryFiltros += ` AND ${filtrosKeys[i]} = ${filtrosValues[i]}`;
        }
      }
    }
  }

  return queryFiltros;
};

export const makeUpdateQuery = (atributosKeys = []) => {
  let queryFiltros = "";

  if (atributosKeys.length > 0) {
    //el primero o solo habia 1
    queryFiltros += ` ${atributosKeys[0]} = ? `;

    if (atributosKeys.length > 1) {
      //varios filtros
      for (let i = 1; i < atributosKeys.length; i++) {
        queryFiltros += `, ${atributosKeys[i]} = ? `;
      }
    }
  }

  return queryFiltros;
};
