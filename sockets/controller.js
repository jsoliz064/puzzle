//var request=require('request');

const sala=require('../controllers/sala');

const socketController = async( socket = new Socket(), io ) => {

    socket.on('obtener-llave',(uid,callback) => {
        
        /* sala.verificar({llave:uid})
            .then(sala=>console.log(sala))
            .catch(err=>{
                sala.crearSala({llave:uid})
                    .then(err=>console.log(sala)
                    .catch(err=>console.log(err))
        }
        ); */
           
        
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

    socket.on('dimencionar', ({ uid, row,col,wx,wy,piezas,img}) => {
        if ( uid ) {
            socket.to( uid ).emit( 'dimencionado', {row,col,wx,wy,piezas,img});
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
    socket.on('terminar-partida2',({uid})=>{
        if ( uid ) {
            socket.to( uid ).emit( 'partida-terminada');
        }
    });

    socket.on('pasar-usuario',({uid,nombre,aciertos})=>{
        if ( uid ) {
            socket.to( uid ).emit( 'recibiendo-jugadores', {nombre,aciertos});
        }
    });
    socket.on('pasar-usuario2',({uid,nombre,aciertos})=>{
        if ( uid ) {
            socket.to( uid ).emit( 'recibiendo-jugadores2', {nombre,aciertos});
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

