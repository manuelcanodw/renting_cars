// Cargar los módulos
const express = require('express');
const app = express();
// Imporatado las rutas
const router = require('./router')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');


app.set('view engine', 'ejs');
// app.set("views", __dirname + "/views") 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(router);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});

 