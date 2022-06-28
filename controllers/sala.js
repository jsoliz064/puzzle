
const pool = require('../database/conexion');

const crearsala=(req)=>{
    console.log('creando sala')

    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM `salas` WHERE ?',[req], function (err, result) {
            if (err){
                reject(err);
            }
            if (result.length==0){
                pool.query('INSERT INTO `salas` set ?', [req], function(err,result){
                    if (err){
                        reject(err);
                    }else{
                        const sala=result.insertId;
                        console.log(sala,"nueva sala creada");
                        resolve({ok:true,sala_id: sala});
                    }
                });
            }else{
                console.log("ya existe la sala");
                resolve({ok: false,sala_id: result[0].id});
            }
        });
    });
}

const crearUsuario=(usuario)=>{
    console.log('creando usuario',usuario)
    return new Promise((resolve,reject)=>{
        pool.query('INSERT INTO `users` set nombre=?', [usuario.nombre], function(err,result){
            if (err){
                reject(err);
            }else{
                let user=result.insertId;
                const usersala={
                    user_id: user,
                    sala_id: usuario.sala,
                    puntos: 0
                }
                pool.query('INSERT INTO `users_salas` set ?', [usersala], function(err,result){
                    if (err){
                        reject(err);
                    }else{
                        const usersala=result.insertId;
                        const users={
                            user_id: user,
                            sala_id: usuario.sala,
                            sala_usuario_id:usersala
                        }
                        console.log('usuario creado',usuario.nombre,users)
                        resolve(users);
                    }
                });
            }
        });
    });
}

const sumarpuntos=(usuario,pieza)=>{
    console.log('sumando puntaje',usuario)
    return new Promise((resolve,reject)=>{
        pool.query('UPDATE `users_salas` SET puntos=? WHERE id=?',[usuario.aciertos,usuario.sala_usuario], function (err, result) {
            if (err){
                reject(err);
            }else{
                console.log('puntaje sumado')
                resolve(result);
            }
        });
    });
}

const resultadofinal=(sala)=>{
    console.log('obteniendo resultados de sala', sala);

    return new Promise((resolve, reject) => {
        pool.query('SELECT users.nombre, users_salas.puntos FROM users JOIN users_salas ON users_salas.user_id=users.id WHERE users_salas.sala_id=?', [sala], function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}



module.exports ={
    crearsala,sumarpuntos,crearUsuario,resultadofinal,
}