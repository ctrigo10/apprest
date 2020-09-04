const express = require('express');
const app = express();

// Importar archivos de rutas
app.use(require('./usuario'));

// Exportar app
module.exports = app;
