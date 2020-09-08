const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarios');
const { rest } = require('underscore');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({email: body.email}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Email incorrecto'
                }
            });
        }
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Password incorrecto'
                }
            });
        }
        // Generar token
        let token = jwt.sign({
            usuario: usuarioDB
        }, 'secreto', { expiresIn: 60 * 60 * 24 });

        return res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });
    });
})

module.exports = app;