// Indicar archivo de configuracion
require('./config/config');

const express = require('express');
const app = express();

// Inicializar body-parser
const bodyParser = require('body-parser');

// Importar mongoose
const mongoose = require('mongoose');

// Parsea el payload de peticiones POST con application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Adicionar como middleware
app.use(bodyParser.json());

// Importar archivo de rutas
app.use(require('./routes/routes'));

// Conexion a la base de datos mongodb
mongoose.connect('mongodb://localhost:27017/apprestdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true
}, (err, res) => {
    if(err) throw err;
    console.log('- Base de datos ONLINE');
});

// Ejecutar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor Iniciado...');
    console.log('- Ejecutar mediante la ruta http://localhost:'+process.env.PORT);
});