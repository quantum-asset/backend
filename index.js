import bodyParser from "body-parser";
import express from "express";
import { iniciarSesion } from "./controller/UsuarioController/UsuarioController.js";
import { conectar } from "./mysql_conector.js";

//const express = require('express');
//var bodyParser = require('body-parser');


const app = express();

 

 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.listen("8000", function () {
  console.log("app init on port 8000");
});

app.get("/", function (req, res) {
  conectar();
  res.status(200).send({ id: 0, nombre: "Jin SSJ" });
});

//Lista completa de los asssets
app.get("/assets", function (req, res) {
  //conectar();
  res.status(200).send({ id: 0, nombre: "Jin SSJ" });
});

app.post("/assets",jsonParser, function (req, res) {
  //conectar();
  console.log("body: ", req.body);
  res.status(200).send({ id: 0, nombre: "Jin SSJ" });
});

app.post("/auth", jsonParser,(req, res) => {
  //conectar();
  console.log("GOT:", req.body);
  const response = iniciarSesion(req.body);
  res.status(200).send(response);
});
