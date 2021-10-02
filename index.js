import express from 'express';
import { conectar } from './mysql_conector.js';

//const express = require('express');

const app= express();

app.listen('8000', function(){
    console.log('app init on port 8000');
});


app.get('/', function(req, res){
    //conectar();
    res.status(200).send({id:0,nombre:"Jin SSJ"});

});

//Lista completa de los asssets
app.get('/assets', function(req, res){
    //conectar();
    res.status(200).send({id:0,nombre:"Jin SSJ"});

});