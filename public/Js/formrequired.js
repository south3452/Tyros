window.onload= function(){
    const nome = document.getElementById("name");
    const email = document.getElementById("email");
    const ass = document.getElementById("Assunto");
    const conteudo = document.getElementById("text");
    const form = document.getElementById("form");

    form.addEventListener('submit', (e) => {
        let messages = []
        if(nome.value === '' || nome.value == null){
            window.alert('foi porra')
        }

        if(messages.length > 0){
            e.preventDefault()
        }
    });
}