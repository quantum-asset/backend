import express from "express";
import mysql from "mysql";
import { ArchivoController } from "../controller/ArchivoController/ArchivoController.js";
import { UsuarioController } from "../controller/UsuarioController/UsuarioController.js";
import { Response } from "../response/Response.js";
import * as fs from "fs";
const ArchivoRouter = express.Router();
const controller = new ArchivoController();
const userController = new UsuarioController();
//ArchivoRouter = express.Router();

//insertar 1 o varios
ArchivoRouter.post("", async (req, res) => {
  try {
    if (!req.files || req.files.file) {
      res.send(Response.error("No se enviaron archivos"));
    } else {
      const file = req.files.file;
      const respuesta = await controller.store(file);
      if (respuesta) {
        res.status(200).send(respuesta);
      } else {
        res.status(500).send(Response.error("Ocurrió un error inesperado"));
      }
    }
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});
//listar mock
ArchivoRouter.get("", async (req, res) => {
  try {
    const fileName =
      "7eda481a31038f1d1917c341706810afdb2fbd1a98d80c6b2d8d437abcb0c5307eda481a31038f1d1917c341706810afdb2fbd1a98d80c6b2d8d437abcb0c530";
    //res.sendFile(`${process.env.RUTA_ARCHIVOS}/${fileName}`);
    // res.sendFile(`./uploads/${fileName}`);
    res.sendFile(`${fileName}`, { root: `./uploads` });
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado" + error));
  }
});
//listar todo
ArchivoRouter.get("/:id", async (req, res) => {
  try {
    const respuesta = await controller.getFileById(req.params.id);
    if (respuesta) {
      res.status(200).send(respuesta);
    } else {
      res.status(500).send(Response.error("Ocurrió un error inesperado"));
    }
  } catch (error) {
    res
      .status(500)
      .send(Response.error("Ocurrió un error inesperado en catch", error));
  }
});

/**

 {
            "ID_ARCHIVO": 1,
            "TIPO_ARCHIVO": "image/jpeg",
            "NOMBRE_ARCHIVO": "ad1b3273f43533101af6af3762e9db214e607fbc97aad13f68823ce3a674d9a1ad1b3273f43533101af6af3762e9db214e607fbc97aad13f68823ce3a674d9a1",
            "RUTA": "/home/ubuntu/files/",
            "FECHA_CREACION": "2021-11-15T00:21:34.000Z",
            "ULTIMA_MODIFICACION": "2021-11-15T00:21:34.000Z",
            "ESTADO": 1
        }
 */
ArchivoRouter.get("/obtener/:id", async (req, res) => {
  try {
    const respuesta = await controller.getFileById(req.params.id);
    if (respuesta) {
      console.log(
        "respuesta obtener file con id " + req.params.id + " ",
        respuesta
      );
      // const fs = require("fs").promises;
      const { NOMBRE_ARCHIVO, RUTA ,TIPO_ARCHIVO} = respuesta.payload[0];
      console.log("retrieve file " + `${RUTA}${NOMBRE_ARCHIVO}`);
      const contentBase64 = await fs.promises.readFile(
        `${RUTA}${NOMBRE_ARCHIVO}`,
        {
          encoding: "base64",
        }
      );
      console.log("retrieve file ", `data:${TIPO_ARCHIVO};base64,${contentBase64.slice(0,28)}`);

      res
        .status(200)
        .send(
          Response.ok(
            "success",
            { file: `data:${TIPO_ARCHIVO};base64,${contentBase64}` },
            "Se decodifico el archivo"
          )
        );
      // res.sendFile(`${NOMBRE_ARCHIVO}`, { root: `${RUTA}` });
    } else {
      console.log("error else, no hay repuesta BD", error);

      res
        .status(500)
        .send(Response.error("Ocurrió un error inesperado en else"));
    }
  } catch (error) {
    console.log("error catch", error);
    res
      .status(500)
      .send(Response.error("Ocurrió un error inesperado en catch", error));
  }
});
//editar uno
ArchivoRouter.put("", async (req, res) => {});

//editar uno
ArchivoRouter.patch("", async (req, res) => {});

//eliminar 1
ArchivoRouter.delete("/:id", async (req, res) => {});

//insertar 1 o varios
ArchivoRouter.post("/usuario/:id", async (req, res) => {
  console.log("llamada al insertar foto de usuario");
  try {
    if (!req.files || !req.files.file) {
      res.send(Response.error("No se enviaron archivos"));
    } else {
      const responseArchivo = await controller.storeFileUser(
        req.params.id,
        req.files.file
      );
      const { status, payload, message } = responseArchivo;
      //// falta el mover archivopoooooo
      if (status.includes("success")) {
        const { insertId } = payload;
        console.log(
          "se registro la imagen en la BD, en el payload esta el id",
          insertId
        );
        const userResponse = await userController.edit(req.params.id, {
          ID_ARCHIVO: insertId,
        });

        res.status(200).send(
          Response.ok(
            "success",
            {
              usuarioResponse: userResponse,
              archivoReponse: responseArchivo,
            },
            "se guardo xdd SIMULACION linea 87"
          )
        );
      } else {
        res
          .status(500)
          .send(
            Response.error("Ocurrió un error al insertar el archivo de imagen")
          );
      }
    }
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//insertar 1 o varios
ArchivoRouter.post("/activo/:id", async (req, res) => {});

export { ArchivoRouter };
