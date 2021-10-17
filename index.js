import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors";
import { FotoRouter } from "./router/FotoRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
//const con = conectar();

// create application/json parser
//add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//console.log("DIIIR",__dirname);
// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
// create application/x-www-form-urlencoded parser

app.use(FotoRouter);
app.listen(port, () => {
  console.log("app init on port " + port);
  //console.log(rutas);
});

/* app.get("/", function (req, res) {
  if (con) {
    res
      .status(200)
      .send(
        ControllerMock("ok", { connection: true }, "La conexion fue exitosa")
      );
  } else {
    res
      .status(400)
      .send(
        ControllerMock(
          "error",
          { connection: false },
          "La conexion no fue exitosa"
        )
      );
  }
}); */
/* 
//Lista completa de los asssets
app.get("/assets", function (req, res) {
  //conectar();
  res.status(200).send({ id: 0, nombre: "Jin SSJ" });
});

app.post("/assets", jsonParser, function (req, res) {
  //conectar();
  console.log("body: ", req.body);
  res.status(200).send({ id: 0, nombre: "Jin SSJ" });
});

app.post("/auth", jsonParser, (req, res) => {
  //conectar();
  console.log("GOT:", req.body);
  const response = iniciarSesion(req.body);
  res.status(200).send(response);
});

app.post("/transaccion", jsonParser, (req, res) => {
  //conectar();
  console.log("Insertar:", req.body);

  let query = "INSERT INTO `files` SET ?",
    values = {
      file_type: "img",
      file_size: "buffer.length",
      file: "buffer",
    };
  console.log(query);
  //const response = iniciarSesion(req.body);
  //res.status(200).send(response);
  res.send({ status: "ok" });
});
 */
