
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