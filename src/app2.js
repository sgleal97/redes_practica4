'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Reporte = require('../models/reporte')
const Contador = require('../models/contador')

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req, res) => {
    res.send({ message: "Microservicio de reportes" })
    
})

app.post('/reporte', async function(req, res){
    let contador = await Contador.find()
    let id = contador.length
    let now= new Date();

    let contador2 = new Contador()
    contador2.contador = id
    
    contador2.save((err, contadorStore) => {
        if (err) res.status(401).send({message: `Error al guardar generador: ${err}`})//500 Datos invalidos
    })

    let reporte = new Reporte()
    reporte.id = id
    reporte.carnet = req.body.carnet
    reporte.nombre = req.body.nombre
    reporte.curso = req.body.curso
    reporte.reporte = req.body.reporte
    reporte.fecha = now + ""
    reporte.servidor = "201602517"

    reporte.save((err, reporteStore) => {
        if (err) res.status(401).send({message: `Error al guardar nuevo reporte: ${err}`})//500 Datos invalidos
        res.status(200).json({mensaje:1})
    })
})

app.get('/reportes', (req, res) => {
    Reporte.find({}, (err, reporte) => {
        if (err) res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if (!reporte) res.status(404).send({message: `reporte inexistentes: ${err}`})
        res.status(200).json({reporte})
    })
})

app.get('/reporte', (req, res) => {
    let reporteId = req.body.id

    Reporte.findOne({id: reporteId}, (err, reporte) => {
        if (err) res.status(500).send({message: `Error al realizar la peticion: ${err}`})//500 Datos invalidos
        if (!reporte) res.status(404).send({message: `reporte no encontrado: ${err}`})
        res.status(200).send({reporte})
    })
})


mongoose.connect('mongodb://localhost:27017/prueba', (err, res) => {
    if (err){
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a base de datos establecida...')
})

module.exports = app