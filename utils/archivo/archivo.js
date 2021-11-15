/**
 * Extracts the extension of the image file and generates an UUID.
 * Finally moves the image to the final storage location with the mv function and sets the name
 * concatenating the uuid and the extension.
 * @param imageFile the image file
 * @returns the new file name generated
 */
export const moveImageToStorageLocation = async (imageFile, filePath) => {
  return new Promise((resolve, reject) => {
    imageFile.mv(filePath, (err) => {
      if (err) {
        resolve({ success: false, error: err });
      } else {
        resolve({ success: true });
      }
    });
  });
};

/**
 * Looks for the first file extension
 * @param fileName file name
 * @returns the file name extension
 */
 export const getExt = (fileName) => {
  const re = /(?:\.([^.]+))?$/;
  const result = re.exec(fileName);
  if (result) {
      return result[1];
  } else {
      return "";
  }

};


/**
 * Looks for the first file extension
 * @param fileName file name
 * @returns the file name extension
 */
 export const getExtFromMime = (mimeFile) => {
  switch(mimeFile){
    case "image/jpeg": return "jpg";
    case "image/jpg": return "jpg";
    case "image/png": return "png";
    /* case "image/jpeg": return "jpg";
    case "image/jpeg": return "jpg"; */
    default: return "jpg";
  }
};