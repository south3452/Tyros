function typewrite(elemento){
    const textarray = elemento.innerHTML.split('');

    elemento.innerHTML = "";
    textarray.forEach((letra, i) =>{
        setTimeout(() => elemento.innerHTML += letra, 250 * i)
    });
}

typewrite(document.querySelector('h2'));