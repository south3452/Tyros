const express = require("express")
const nodemailer = require("nodemailer")
const app = express()

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

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

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/views/Index.html")
})

app.post('/', (req, res) => {
    console.log(req.body)
    
    const mailOption = {
        from: "CONTATO <tyrossoftwares@gmail.com>",
        to: "tyrossoftwares@gmail.com",
        subject:"Nome: " + req.body.nome +"/ E-mail: " + req.body.email,
        text:"Texto do email",
        html: "Assunto: " + req.body.assunto + "<br>" + "Telefone: " + req.body.tel + "<br>" + req.body.texto
    }

    transporter.sendMail(mailOption, function(err, info){
        if(err)
            console.log(err)
        else
            res.send("ENVIADO");
            console.log("ENVIADO")
    })
})

app.listen(443,()=>{
    console.log("Rodando")
})
