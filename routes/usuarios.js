const express = require('express');
const router = express.Router();
const pool = require('../database/conexion');

router.post('/add', async (req, res) => {
    const { nombre } = req.query;
    const newSalas = {
        nombre: nombre,
    };
    const sala = await pool.query('INSERT INTO users set ?', [newSalas]);
    res.json(sala);
});

module.exports = router;