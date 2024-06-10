const mysql = require("mysql");
const express = require("express");
const rutas = express.Router();

const configMySQL = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connection = mysql.createConnection(configMySQL);

function obtenerTipos(callback) {
    const select = `SELECT tipo FROM modelos GROUP BY tipo`;
    connection.query(select, (err, result, fields) => {
      if (err) {
        console.error(err);
        callback(err, null);
        return;
      }
  
      callback(null, result);
    });
  }
  
  rutas.get("/", (req, res) => {
    obtenerTipos((err, result) => {
      if (err) {
        return res.status(500).send('Error en la consulta a la base de datos');
      }
  
      res.render("index", { title: "Alquilandolo", tipos : result });
      console.log(result);
    });
  });

  rutas.get("/:tipo", (req, res) => {
    const tipoSeleccionado = req.params.tipo;
    const tipos = req.query.tipos ? JSON.parse(req.query.tipos) : [];
    // console.log("tipo select", tipoSeleccionado);
    const select = `SELECT * FROM modelos WHERE tipo = ?`;
    connection.query(select, [tipoSeleccionado], (err, result, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error en la consulta a la base de datos');
      }
      res.render("tipo", { title: `Alquila ${tipoSeleccionado}`, data1: result, tipos: tipos });
      // console.log("resultado:", result);
    });
  });


  rutas.get("/:tipo/:nombre", (req, res) => {
    const tipoSeleccionado = req.params.tipo;
    const nombreSeleccionado = req.params.nombre;
    const tipos = req.query.tipos ? JSON.parse(req.query.tipos) : [];

    const select = `SELECT * FROM modelos WHERE nombre_modelo = ?`;
    connection.query(select, [nombreSeleccionado], (err, result, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error en la consulta a la base de datos');
      }
      res.render("modelo", { title: `Alquila tu ${nombreSeleccionado}`, data1: result, tipos: tipos });
      console.log("resultado:", result);
    });
});

module.exports = rutas;
