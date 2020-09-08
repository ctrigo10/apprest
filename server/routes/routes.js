const express = require('express');
const app = express();

// Importar archivos de rutas
app.use(require('./usuario'));
app.use(require('./login'));

// Exportar app
module.exports = app;
