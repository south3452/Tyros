var animacao = function(e){
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
}

module.exports = animacao