const searchParams=new URLSearchParams(window.location.search);
const btnEnviar   = document.querySelector('#btnEnviar');
const txtMensaje = document.querySelector('#txtMensaje');
const txtSala     = document.querySelector('#txtSala');

//sockets
if (!searchParams.has('sala')){
    window.location='index.html';
    throw new Error('No se encontro la sala')
}
const uid = searchParams.get('sala');

const socket = io();

socket.on('connect', () => {
    console.log('conectado'+uid);
    socket.emit('obtener-llave',uid);
});

socket.on('disconnect', () => {
    console.log('Se ha perdido la conexion');
});

socket.on('recibir-mensajes', (mensaje) =>{
    console.log(mensaje);
});

/* socket.on('mensaje-privado', ( payload ) => {
    console.log('Privado:', payload )
}); */

/* btnEnviar.addEventListener('click', ()=> {
    const mensaje = txtMensaje.value;
    socket.emit('enviar-mensaje', { mensaje, uid },(enviado)=> {
        console.log(mensaje);
    });
}); */
//puzzle
var piezas = document.getElementsByClassName('movil');

var tamWidh = [134,192,134,163,134,163,134,192,134];
var tamHeight = [163,134,163,134,192,134,163,134,163];

for(var i=0;i<piezas.length;i++){
	piezas[i].setAttribute("width", tamWidh[i]);
	piezas[i].setAttribute("height",tamHeight[i]);
	piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
	piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
	piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");
	piezas[i].setAttribute("id",i);

}

var elementSelect = 0;  
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
    
	elementSelect = reordenar(evt);
    const elemento_id=elementSelect.getAttribute("id");

    socket.emit('seleccionar-elemento', { uid ,elemento_id});

	currentX = evt.clientX;        
	currentY = evt.clientY;
	currentPosX = parseFloat(elementSelect.getAttribute("x"));     
	currentPosY = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove","moverElemento(evt)");
}

function moverElemento(evt){
    var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
    currentPosX = currentPosX + dx;
	currentPosY = currentPosY + dy;

    const px=currentPosX;
    const py=currentPosY;

    socket.emit('enviar-mensaje', { uid ,px,py});

	elementSelect.setAttribute("x",currentPosX);
	elementSelect.setAttribute("y",currentPosY);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
	elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
	iman();
}
socket.on('mover-elemento', ( {elemento_id} ) => {
    elementSelect=piezas[elemento_id];
});

socket.on('mensaje-privado', ( {px,py} ) => {
    currentPosX = px;        
	currentPosY = py;
	elementSelect.setAttribute("x",currentPosX);
	elementSelect.setAttribute("y",currentPosY);
    iman();
	//elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
	//elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
});



function deseleccionarElemento(evt){
	testing();
	if(elementSelect != 0){			
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}

var entorno = document.getElementById('entorno');

function reordenar(evt){
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

var origX = [200,304,466,200,333,437,200,304,466];   
var origY = [100,100,100,233,204,233,337,366,337];

function iman(){
	for(var i=0;i<piezas.length;i++){
		if (Math.abs(currentPosX-origX[i])<15 && Math.abs(currentPosY-origY[i])<15) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}
			
var win = document.getElementById("win");

function testing() {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for(var i=0;i<piezas.length;i++){
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada = bien_ubicada + 1;
		}
	}
	if(bien_ubicada == 9){
		win.play();
	}
}

