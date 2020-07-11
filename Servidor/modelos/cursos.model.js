;
'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cursos_model = new Schema({
    titulo: { type: String },
    professor: { type: String },
    description: { type: String },
    asignatura: { type: String },
    participants: { type: Array },
    sessionID: { type: String },
    createAt: { type: Date },
});

module.exports = mongoose.model('cursos', cursos_model);