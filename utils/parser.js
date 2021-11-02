/**
 * convert to string and then to Json
 * @param {*} data 
 * @returns 
 */
export const Parser = (data) => {
  return JSON.parse(JSON.stringify(data));
};
