
const pool = require('../database/conexion');

const verificar=(req)=>{
    return new Promise((resolve,reject)=>{
        const sala=pool.query('SELECT * FROM salas WHERE llave = ?',[req]);
        (sala.length>0)?resolve(sala):reject('mrd');
    });
}

const crearSala=(req)=>{
    return new Promise((resolve,reject)=>{
        const sala = pool.query('INSERT INTO salas set ?', [req]);
        (sala)?resolve(sala):reject(null);
    });
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
    verificar,crearSala
}