const express = require('express');
const router = express.Router();
const pool = require('../database/conexion');

router.post('/add', async (req, res) => {
    const { user_id,sala_id } = req.query;
    const newSalas = {
        user_id: user_id,
        sala_id: sala_id,
        puntos:0
    };
    const sala = await pool.query('INSERT INTO users_salas set ?', [newSalas]);
    res.json(sala);
});

router.post('/edit', async (req, res) => {
    const {user_id,sala_id,puntos} = req.query;
    const newSalas = {
        puntos,
        
    };
    const sala = await pool.query('UPDATE users_salas SET puntos=? WHERE user_id=? AND sala_id=?',[puntos,user_id,sala_id]);
    res.json(sala);
});

module.exports = router;