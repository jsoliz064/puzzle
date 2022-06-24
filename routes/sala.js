const express = require('express');
const router = express.Router();
const pool = require('../database/conexion');

router.post('/add', async (req, res) => {
    console.log(req.query);
    const { llave, filas,columnas,width,height,imagen } = req.query;
    const newSalas = {
        llave: llave,
    };
    const sala = await pool.query('INSERT INTO salas set ?', [newSalas]);
    res.json(sala);
    
});

module.exports = router;