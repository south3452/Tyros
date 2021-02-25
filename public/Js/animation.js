/*const anime = require('animejs')
const nodemailer = require("nodemailer")
const nome = document.querySelector('#name')
const email = document.querySelector('#email')
const tel = document.querySelector('#tel')
const ass = document.querySelector('#Assunto')
const texto = document.querySelector('#text')
const form = document.querySelector('#envioemail')



let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure: false,
    auth:{
        user: "tyrossoftwares@gmail.com",
        pass: "niviadino"
    },
    tls: {
        rejectUnauthorized: false
    }
})



form.addEventListener('submit', el => {
    el.preventDefault()
    animacao(0)
    const mailOption = {
        from: "CONTATO <tyrossoftwares@gmail.com>",
        to: "mohamed.santosabreu@gmail.com",
        subject:"Nome:" + nome +" E-mail: " + email,
        text:"Texto do email",
        html: "Assunto: " + ass + "<br>" + "Telefone: " + tel + "<br>" + texto
    }
    transporter.sendMail(mailOption, function(err, info){
        if(err)
            console.log(err)
        else
            console.log("ENVIADO");
    })
})

const animacao = function(e){
    if(e === 0){
        console.log("foi o 0") //teste para saber se rodou 
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
    else if(e === 1){
        console.log("foi o 1") //teste para saber se rodou 
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
                    remove('#logo');
                    anime({
                        targets:'.linha',
                        strokeDashoffset: [setDashoffset, 0],
                        opacity: 1,
                        direction: 'linear',
                        easing: 'cubicBezier(0.625, 0.105, 0.750, 0.750)'
                    });
                }
        });
    }
}

module.exports = animacao;*/