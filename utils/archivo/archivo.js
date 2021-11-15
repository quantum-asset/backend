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
