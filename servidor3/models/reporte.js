'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReporteSchema = Schema({
    id: {type: Number, unique: true},
    carnet: String,
    nombre: String,
    curso: String,
    reporte: String,
    fecha: String,
    servidor: String
})

module.exports = mongoose.model('Reporte', ReporteSchema)