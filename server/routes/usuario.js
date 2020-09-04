const express = require('express');
const app = express();

app.get('/usuario', (req, res) => {
    res.json('hola mundo get');
})

app.post('/usuario', (req, res) => {
    // Cuerpo de la peticion = payload
    let persona = req.body;
    // res.json('hola mundo post');
    res.json(persona);
})

// Exportar app
module.exports = app;