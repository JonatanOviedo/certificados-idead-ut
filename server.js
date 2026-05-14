// EVIDENCIA: GA7-220501096-AA3-EV01 
// Módulo de consulta de certificados - Jonatan Oviedo

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos (Puerto 3307 según tu XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'sistema_certificados',
    port: 3307 
});

db.connect(err => {
    if (err) {
        console.log("Error al conectar a MySQL: ", err);
    } else {
        console.log("¡Conectado exitosamente a la base de datos en el puerto 3307!");
    }
});

// Ruta para consultar por cédula
app.get('/consultar/:cedula', (req, res) => {
    const cedula = req.params.cedula;
    const sql = "SELECT * FROM egresados WHERE cedula = ?";

    db.execute(sql, [cedula], (err, result) => {
        if (err) return res.status(500).send(err);
        
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ mensaje: "Egresado no encontrado" });
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor backend listo en http://localhost:3000");
});