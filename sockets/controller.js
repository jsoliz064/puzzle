//var request=require('request');

const sala=require('../controllers/sala');

let usuarios=[];

const socketController = async( socket = new Socket(), io ) => {

    /* SOCKETS COMO APIS */
    socket.on('crear-usuario',(usuario,callback)=>{
        sala.crearUsuario(usuario)
            .then(result=>callback(result))
        .catch(err=>console.log(err));
    });

    socket.on('sumar-puntos',(usuario,pieza)=>{
        sala.sumarpuntos(usuario,pieza)
        .then(result=>console.log("exito"))
        .catch(err=>console.log(err))

    });
    
    socket.on('partida-terminada',(uid,sala_usuario,sala_id,callback) => {
        sala.resultadofinal(sala_id)
        .then(result=>{
            console.log(result);
            callback(result);
            socket.to(uid).emit('resultado-final',result)
        })
        .catch(err=>console.log(err))

    });

    socket.on('obtener-resultados',(uid) => {
        console.log(usuarios);
        socket.to( uid ).emit( 'resultados', usuarios);
    });

    socket.on('obtener-llave',(uid,callback) => {
        sala.crearsala({llave:uid})
            .then(result=>callback(result))
            .catch(err=>console.log(err));

        socket.join( uid );
    });

    /* puzzle primera version */
    socket.on('enviar-mensaje', ({ uid,px,py }) => {
        if ( uid ) {
            // Mensaje privado
            socket.to( uid ).emit( 'mensaje-privado', { px,py });
        } else {
            io.emit('recibir-mensajes', "ga" );
        }
    });

    socket.on('seleccionar-elemento', ({ uid, elemento_id }) => {
        if ( uid ) {
            socket.to( uid ).emit( 'mover-elemento', {elemento_id});
        }
    });
    /* NUEVO ROMPECABEZAS */
    socket.on('nuevo-usuario', (uid) => {
        if ( uid ) {
            socket.to( uid ).emit( 'usuario-conectado');
        }
    });

    socket.on('dimencionar', ({ uid, row,col,wx,wy,piezas,img,mx,my,mw,mh}) => {
        if ( uid ) {
            socket.to( uid ).emit( 'dimencionado', {row,col,wx,wy,piezas,img,mx,my,mw,mh});
        }
    });

    socket.on('empezar', ({uid,piezas}) => {
        if ( uid ) {
            socket.to( uid ).emit( 'empezado',({piezas}) );
        }
    });

    socket.on('set-piezas', ({ uid, piezas }) => {
        if ( uid ) {
            socket.to( uid ).emit( 'get-piezas', {piezas});
        }
    });
    socket.on('cambiar-posicion', ({ uid, index }) => {
        if ( uid ) {
            socket.to( uid ).emit( 'posicion-cambiada', {index});
        }
    });
    socket.on('seleccionar-pieza', ({ uid, posicion }) => {
        if ( uid ) {
            socket.to( uid ).emit( 'pieza-seleccionada', {posicion});
        }
    });
    socket.on('soltar-pieza',({uid,posicion})=>{
        if ( uid ) {
            socket.to( uid ).emit( 'pieza-soltada', {posicion});
        }
    });

    socket.on('mover-pieza', ({ uid,posicion, mx,my }) => {
        if ( uid ) {
            socket.to( uid ).emit( 'pieza-movida', {posicion,mx,my});
        }
    });

    socket.on('cambiar-imagen', ({ uid, imagen }) => {
        if ( uid ) {
            socket.to( uid ).emit( 'imagen-cambiada', {imagen});
        }
    });

    socket.on('add-jugador',({uid,jugador})=>{
        if ( uid ) {
            socket.to( uid ).emit( 'jugador-agregado', {jugador});
        }
    });

    socket.on('terminar-partida',({uid})=>{
        if ( uid ) {
            socket.to( uid ).emit( 'partida-terminada');
        }
    });

    socket.on('reiniciar-partida',({uid})=>{
        if ( uid ) {
            socket.to( uid ).emit( 'partida-reiniciada');
        }
    });
    socket.on('recargar-pagina',({uid})=>{
        if ( uid ) {
            socket.to( uid ).emit('pagina-recargada');
        }
    });
}

module.exports = {
    socketController
}

