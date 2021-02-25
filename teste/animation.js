


/*const nodemailer = require("nodemailer")
const nome = document.querySelector('#name')
const email = document.querySelector('#email')
const tel = document.querySelector('#tel')
const ass = document.querySelector('#Assunto')
const texto = document.querySelector('#text')
const form = document.querySelector('#envioemail')
*/

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


