
//const txtSala     = document.querySelector('#txtSala');
const txtSala2     = document.querySelector('#txtSala2');
let elm = document.getElementById('imagen');
let imagenes = ["img2.jpg", "img3.png","pikachu.png"];
let i=0;
let imagen=document.getElementById('img');
function siguiente() {
    i++;
    if (i==imagenes.length){
        i=0;
    }
    elm.src="./img/"+imagenes[i];
    imagen.value=imagenes[i];
}
function atras(){
    if (i==0){
        i=imagenes.length-1;
    }else{
        i--;
    }
    elm.src="./img/"+imagenes[i];
    imagen.value=imagenes[i];
}

const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result1;
}

//txtSala.value = generateRandomString(50);
txtSala2.value = generateRandomString(50);

