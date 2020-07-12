;
'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cursos_model = new Schema({
    titulo: { type: String },
    profesor: { type: String },
    description: { type: String },
    asignatura: { type: String },
    sessionID: { type: String },
    createAt: { type: Date },
});

module.exports = mongoose.model('cursos', cursos_model);