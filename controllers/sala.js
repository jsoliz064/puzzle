
const pool = require('../database/conexion');

const verifSala=async(req)=>{
    const { llave } = req;
    const newSalas = {
        llave: llave,
    };
    const sala=await pool.query('SELECT * from salas where ?', [newSalas]);
    if (sala!==""){
        return true;
    }
    return false;
}


const crearSala = async(req) => {
    const { llave, filas,columnas,width,height,imagen } = req;
    const newSalas = {
        llave: llave,
    };
    const sala=await pool.query('SELECT * from salas where ?', [newSalas]);
    if (sala==""){
        const sala = await pool.query('INSERT INTO salas set ?', [newSalas]);
        return sala;
    }
}
const crearUsuario=async(req)=>{
    const {id,nombre,aciertos}= req;
    const user=await pool.query('SELECT * from users where ?', [id]);
    if (user==""){
        const user= {
            nombre,aciertos
        }
        return await pool.query('INSERT INTO users set ?', [user]);
    }
    return null;
}

const crearUserSala = async(req) => {
    const {uid,nombre,aciertos } = req;
    const newSalas = {
        nombre,
        aciertos
    };
    const sala=await pool.query('SELECT * from salas where ?', [uid]);
    if (sala!==""){
        const user = await pool.query('INSERT INTO users set ?', [newSalas]);
        const usersala={
            user_id:user.id, 
            sala_id:sala.id, 
            puntos: aciertos
        }
        const user_sala = await pool.query('INSERT INTO users_salas set ?', [usersala]);
        return sala;
    }else{

    }
}

module.exports ={
    crearSala,verifSala,crearUsuario
}