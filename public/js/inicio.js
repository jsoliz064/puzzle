
//const txtSala     = document.querySelector('#txtSala');
const txtSala2     = document.querySelector('#txtSala2');
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

