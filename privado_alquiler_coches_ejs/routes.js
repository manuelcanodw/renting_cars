// Cargar MySQL
const mysql = require('mysql');

// Cargar Express
const express = require("express");
// Cargar configurador de rutas
const rutas = express.Router();

const configMySQL = {
  host: process.env.HOST,

  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}
const connMySQL = mysql.createConnection(configMySQL)

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "", datos: "" });
});

rutas.get("/", (req, res) => {
  // console.log(configMySQL);
  const select = 'SELECT * FROM clientes'
  connMySQL.query(select, (err, resultado, fields) => {
    if (err) throw err
    console.log(resultado);
     res.render("index", { title: "", datos: resultado });
  })
});

rutas.post("/insert", (req, res) => { 

  console.log(req.body);
  const {nombre, apellido, telefono, tipo} = req.body
  const insert = `INSERT INTO agenda (nombre, apellido, telefono, tipo) VALUES ('${nombre}', '${apellido}', '${telefono}', '${tipo}')`
  connMySQL.query(insert, (err, resultado, fields) => {
    if (err) throw err
    // Después del insert volvemos a la página inicial
    res.redirect("/");
  })

})

module.exports = rutas;