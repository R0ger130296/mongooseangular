;
'use strict'
const fs = require('fs'),
    path = require('path'),
    bcrypt = require('bcrypt'),
    jwt = require("jsonwebtoken"),
    cursosa_model = require('../modelos/cursos.model');

let getCursos = (req, res) => {
    cursosa_model.find()
        .then(data => {
            res.status(200).json({
                msg: 'ok',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })
}

//insertar uno
let nuevoCurso = (req, res) => {
    let curso = req.body.data
    cursosa_model.create(curso)
        .then(data => {
            res.status(200).json({
                msg: 'ok',
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })

}

let deleteOne = (req, res) => {
    id = req.params.id
    cursosa_model.deleteOne({ '_id': id })
        .then(data => {
            res.status(200).json({
                msg: `${data.deletedCount}`,
                data: data,
                transaccion: true
            })
        }).catch(e => {
            res.status(500).json({
                msg: e,
                data: null,
                transaccion: false
            })
        })
}

let updateOne = (req, res) => {
    let _id = req.params.id,
        data = req.body.data;
    cursosa_model.updateOne({ '_id': _id }, { $set: data })
        .then((data) => {
            res.status(200).json({
                ok: true,
                data: data,
                msg: "ready",
                token: req.token,
            });
        })
        .catch((err) => {
            res.status(500).json({
                ok: false,
                data: null,
                msg: err,
            });
        });
};
module.exports = {
    getCursos,
    nuevoCurso,
    deleteOne,
    updateOne
}