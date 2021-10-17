/**
 * Reads an image file in a promise way, so you can use await.
 * If other kind of file is sent, this function will read it anyway
 * and will return a string that contains the URL representation
 * @param file File image object
 * @returns data URL of the image file
 */
 export const readImagePromise = (file) => {
    console.log("START", file);

    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = function () {
                console.log("LOAD");
                resolve(reader.result);
            }
            reader.readAsDataURL(file);
        } catch (error) {
            resolve(undefined);
        }
    });
}
