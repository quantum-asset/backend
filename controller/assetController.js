export const ListOfAssets = [
    {id:0, denominacion:"ESCRITORIO"},
];
export const getListOfAssets = () => {
  return ListOfAssets;
};

export const getAssetByID = (id) => {
  const response = ListOfAssets.filter((x) => x.id === id);
  if (response.length>0) {
    return response[0];
  }
};

export const deleteAsset=(id)=>{
    const response = ListOfAssets.filter((x) => x.id === id);
  if (response.length>0) {
    return id;
  }
}