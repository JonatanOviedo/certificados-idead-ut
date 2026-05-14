const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de conexión (Usando tu puerto 3307 configurado en XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'sistema_certificados',
    port: 3307 
});

// Comprobar la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.log('Error conectando a la base de datos:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos en el puerto 3307!');
});

// --- SERVICIO DE REGISTRO ---
app.post('/registrar', (req, res) => {
    const { usuario, clave } = req.body;
    const sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
    
    db.query(sql, [usuario, clave], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error al registrar" });
        res.json({ mensaje: "Usuario registrado satisfactoriamente" });
    });
});

// --- SERVICIO DE LOGIN (Requerido por la evidencia) ---
app.post('/login', (req, res) => {
    const { usuario, clave } = req.body;
    const sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";

    db.query(sql, [usuario, clave], (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error en el servidor" });
        
        // Si el resultado tiene datos, los credenciales son correctos
        if (result.length > 0) {
            res.json({ mensaje: "Autenticación satisfactoria" });
        } else {
            res.json({ mensaje: "Error en la autenticación" });
        }
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor de Autenticación listo en http://localhost:3000');
});