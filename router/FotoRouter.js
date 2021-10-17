import express from "express";
import mysql from "mysql";
import _ from "lodash";
import { newResponse } from "../response/Response.js";
import { readImagePromise } from "../utils/utils.js";
import { insertFoto } from "../controller/FotoController/Foto.controller.js";
import * as fs from "fs";
import { promisify } from "util";
import * as path from "path";

const promiseReadFile = promisify(fs.readFile);
const FotoRouter = express.Router();

//FotoRouter = express.Router();

//listar 1 foto
//FotoRouter.get("/foto/:id", (req, res) => {});

//insertar 1 o varios
FotoRouter.post("/foto", async (req, res) => {
  let sampleFile;
  let uploadPath;
  //console.log("DIR", "__dirname");
  //console.log("DIR", __dirname);

  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .send(newResponse("error", {}, "No se adjuntaron archivos."));
    }
    //console.log("FILES", req.files);

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.foto;
    console.log("FOOTO", sampleFile);

    //console.log("NAME", sampleFile.name);
    //console.log("DIR", __dirname);
    //
    uploadPath = "./files/" + sampleFile.name;
    //console.log("DIR", uploadPath);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath);
    //console.log("MOVE", uploadPath);

    //tengo el file, deboleerlo, como blob
    // const fileBuffer = await readImagePromise(sampleFile);

 /*    const currentWorkSpace = path.isAbsolute("../")
      ? imageFile.tempFilePath
      : path.join(__dirname, "..", "..", "..", imageFile.tempFilePath); */
    //console.log("currentWorkSpace", uploadPath);

    const imageBuffer = await promiseReadFile(uploadPath);

    //console.log("fileBuffer", imageBuffer);

    const respuesta = await insertFoto(imageBuffer);
    console.log("respuesta", respuesta);
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send("error");
  }
});
//insertar varios
FotoRouter.post("/fotos", (req, res) => {});
//editar uno
FotoRouter.put("/foto/:id", (req, res) => {});

//eliminar 1
FotoRouter.delete("/foto/:id", (req, res) => {});

export { FotoRouter };
