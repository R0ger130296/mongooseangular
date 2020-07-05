;
'use strict'
const express = require('express'),
    multiParty = require('connect-multiparty'),
    passwordcontrol = require('../auth/password'),
    autenticacioncontrol = require('../auth/autenticacion'),
    rolescontrol = require('../auth/rol')
let api = express.Router(),
    usuarioControl = require('../controller/usuarios.controller'),
    galeriaMiddLeware = multiParty({ uploadDir: './files/galeria' })

api.get('/usuarios', usuarioControl.getUsuario)

api.post('/insert_usuario', usuarioControl.insertOne)
api.post('/insert_usuario_many', usuarioControl.insertMany)
api.put('/update/:id', usuarioControl.updateOne)
api.get('/usuario/:id', usuarioControl.get_usuario_one)
api.delete('/usuarios_delete', usuarioControl.deleteMany)
api.delete('/usuario_delete/:id', usuarioControl.deleteOne)

api.post('/insert', [passwordcontrol.codificar], usuarioControl.nuevoUsuario)
api.post('/login', usuarioControl.login)
module.exports = api