import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors";
import { TipoLocacionRouter } from "./server/router/TipoLocacionRouter.js";



dotenv.config();

const app = express();
const port = process.env.PORT;

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

app.use("/tipo-locacion", TipoLocacionRouter);
/* app.use("/locacion", LocacionRouter);

app.use("/necesidad-tag", NecesidadTagRouter);

app.use("/permiso", PermisoRouter);
app.use("/rol", RolRouter);

app.use("/necesidad-tag", UsuarioRouter);
app.use("/transaccion", TransaccionRouter);


app.use("/tag", TagRouter);

app.use("/area-responsable", AreaResponsableRouter);

app.use("/tipo-activo", TipoActivoRouter);
app.use("/activo", ActivoRouter);


app.use("/necesidad-tag", TomaInventarioRouter);
app.use("/necesidad-tag", GlobalRouter);


app.use("/auth", AuthRouter);

app.use("/archivo", ArchivoRouter); */
app.get("/", (req, res) => {
  //const input = req.body;
 // console.log("body", input);
  console.log("headers", req.headers);
  console.log("params", req.params);
  console.log("body", req.body);
  res.status(200).send({ youSent: {} });
});
app.post("/", (req, res) => {
  const input = req.body;
  console.log("body", input);
  console.log("headers", req.headers);
  console.log("params", req.params);
  res.status(200).send({ youSent: input });
});

app.listen(port, () => {
  console.log("Quantum Asset iniciado en el puerto: " + port);
  //console.log(rutas);
});
