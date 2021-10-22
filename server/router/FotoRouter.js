import express from "express";
import mysql from "mysql";
import _ from "lodash";
import { newResponse } from "../response/Response.js";
import { readImagePromise } from "../utils/utils.js";
import { getFotoById, insertFoto } from "../controller/FotoController/Foto.controller.js";
import * as fs from "fs";
import { promisify } from "util";
import * as path from "path";

const promiseReadFile = promisify(fs.readFile);
const FotoRouter = express.Router();

//FotoRouter = express.Router();



//insertar 1 o varios
FotoRouter.post("/foto", async (req, res) => {
  let sampleFile;
  let uploadPath;


  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .send(newResponse("error", {}, "No se adjuntaron archivos."));
    }
  sampleFile = req.files.foto;
    console.log("FOOTO", sampleFile);


    uploadPath = "./files/" + sampleFile.name;
    sampleFile.mv(uploadPath);

    const imageBuffer = await promiseReadFile(uploadPath);

    const respuesta = await insertFoto(imageBuffer);
    console.log("respuesta", respuesta);
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send("error");
  }
});
//insertar varios
FotoRouter.post("/fotos", (req, res) => {});


//listar 1 foto
FotoRouter.get("/foto/:id", async (req, res) => {
  try {
    if(!req.params.id && req.params.id>0){
      return res
        .status(500)
        .send(newResponse("error", {}, "No se adjuntó un id valido o es vacío"));
    }
    const resposne = await getFotoById(req.params.id);
    console.log("==>",resposne);
    res.status(200).send(resposne);
  } catch (error) {
    res.status(500).send(newResponse("error",{},error));
  }
});
//editar uno
FotoRouter.put("/foto/:id", (req, res) => {

});

//eliminar 1
FotoRouter.delete("/foto/:id", (req, res) => {});

export { FotoRouter };
