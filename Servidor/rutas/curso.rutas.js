;
'use strict'
const express = require('express'),
    multiParty = require('connect-multiparty'),
    passwordcontrol = require('../auth/password'),
    autenticacioncontrol = require('../auth/autenticacion'),
    rolescontrol = require('../auth/rol')
let api = express.Router(),
    cursoControl = require('../controller/cursos.controller'),
    rolControl = require('../auth/rol');

api.get('/cursos', autenticacioncontrol.autentificar, cursoControl.getCursos)
api.put('/update_curso/:id', autenticacioncontrol.autentificar, cursoControl.updateOne)
api.delete('/curso_delete/:id', autenticacioncontrol.autentificar, cursoControl.deleteOne)
api.post('/insert_curso', cursoControl.nuevoCurso)
module.exports = api