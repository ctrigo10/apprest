const express = require('express');
const app = express();

// Importar bcrypt
const bcrypt = require('bcrypt');

// Importar underscore
const _ = require('underscore');

// Importar modelo
const Usuario = require('../models/usuarios');

// Importar middleware
const { verificaToken } = require('../middleware/middleware');

app.get('/usuario', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    // Obtener los registros
    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    total: conteo
                });
            });
        });
    // res.json('hola mundo get');
    
})

app.post('/usuario', (req, res) => {
    // Cuerpo de la peticion = payload
    let body = req.body;
    // Instanciar un objeto de modelo pasando los datos
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    // Guardar en la base de datos
    usuario.save((err, usuarioDB) => {
        // Gestionar errores
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // Enviar mensaje de exito
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    // res.json('hola mundo post');
    // res.json(usuario);
})

// Editar 
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado']);
    // Editar en la base de datos
    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) => {
        // Gestionar errores
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // Enviar mensaje de exito
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
})

// Eliminar
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    // Editar en la base de datos
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        // Gestionar errores
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // Enviar mensaje de exito
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
})

// Exportar app
module.exports = app;