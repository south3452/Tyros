const contactform = document.querySelector('#formulario')
let nome = document.getElementById('name')
let email = document.getElementById('email')
let tel = document.getElementById('tel')
let ass = document.getElementById('Assunto')
let texto = document.getElementById('text')


contactform.addEventListener('submit', (e) => {
    e.preventDefault();
    let formdata ={
        nome: nome.value,
        email: email.value,
        telefone: tel.value,
        assunto: ass.value,
        texto: texto.value,
    }

    let xrh = new XMLHttpRequest();
    xrh.open('POST', '/')
    xrh.setRequestHeader('content-type', 'application/json')
    xrh.onload = function(){
        console.log(xrh.responseText);
        if (xrh.responseText = 'succes'){
            comecar()
            
            nome.value = ''
            email.value = ''
            tel.value = ''
            ass.value = ''
            texto.value = ''
        }else{
            console.log('qq aconteceu marreco?')
        }
    }

    xrh.send(JSON.stringify(formdata));

    xrh.onreadystatechange = function(){
        
        if(xrh.readyState === 4) {
            setTimeout(terminar, 8000)
        } else {
            console.log('Ainda não foi')
        }
        
    };

    
})


        function comecar(){
            anime({
            targets: '#butao',
            width: '100px', // -> from '28px' to '100%',
            easing: 'linear',
            loop: false,
            begin: function(){
                anime({
                    targets: "#logo",
                    easing: 'linear',
                    translateY: -10,
                    translateX: 0,
                });
            },
            //fazer o texto sumir
            complete: function(){
                anime({
                    targets:"#abc",
                    direction: 'normal',
                    easing: 'easeOutQuad',
                    opacity: 0,
                    //fazer o logo aparecer
                    complete: function(){
                                anime({
                                targets:"#logo",
                                opacity: 1,
                                //fazer o logo girar
                                begin: function(){
                                            anime({
                                            targets:"#logo",
                                            rotate: '1turn',
                                            easing: 'linear', 
                                            loop: true,
                                        });
                                    }
                                });
                            }
                    });
                }
            });
        }

        function terminar(){
            anime({
                targets:'#logo',
                opacity: 0,
                easing: 'cubicBezier(0.625, 0.105, 0.750, 0.750)',
                    begin: function(){
                        anime({
                            targets:'#certo',
                            translateY: '-130%',
                        });
                    },
                    complete: function(){
                        anime.remove('#logo');
                        anime({
                            targets:'.linha',
                            strokeDashoffset: [anime.setDashoffset, 0],
                            opacity: 1,
                            direction: 'linear',
                            easing: 'cubicBezier(0.625, 0.105, 0.750, 0.750)'
                        });
                    }
            });
        }

        function tremer(){
            anime({
                targets:".wrapper",
                keyframes:[
                    {translateX: 10},
                    {translateX: -10},
                    {translateX: 10},
                    {translateX: -10},
                    {translateX: 0},
                ],
                easing: 'easeOutElastic(2, .8)',
                duration: 300
            });
        }


