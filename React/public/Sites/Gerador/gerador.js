let slider = document.querySelector("#slider");/*O querySelector() método retorna o primeiro elemento que corresponde a um seletor CSS.*/
let button = document.querySelector('#button');

let size = document.querySelector('#valor');
let password = document.querySelector("#password");

let container = document.querySelector('#container');

let charset = '0123456789abcdefghijklmnopqrstuvwxyzBCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';
let novaSenha = "";

size.innerHTML = slider.value;

slider.oninput = function(){
    size.innerHTML = this.value;/*O evento oninput ocorre quando um elemento recebe a entrada do usuário. */
}

function generatePassword(){
    
    let pass = "";
    for(let i = 0, n = charset.length; i < slider.value; ++i){
        pass += charset.charAt(Math.floor(Math.random() * n));  
    }
    container.classList.remove("hide");
    password.innerHTML = pass;
    novaSenha = pass;

}
function copi(){
    alert("COPIOU CARAI!")
    navigator.clipboard.writeText(novaSenha);/*Copia no teclado aí */
}

































