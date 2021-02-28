const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const app = express()

app.set('view engine','ejs')

app.use(express.static(__dirname + '/public'))



app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

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

// To estudando um jeito do anime dar certo deixa aqui plz
var teste = function (req, res, next){
        const mailOption = {
            from: "CONTATO <tyrossoftwares@gmail.com>",
            to: "mohamed.santosabreu@gmail.com",
            subject:"Nome:" + req.body.nome +" E-mail: " + req.body.email,
            text:"Texto do email",
            html: "Assunto: " + req.body.assunto + "<br>" + "Telefone: " + req.body.tel + "<br>" + req.body.texto
        }

        transporter.sendMail(mailOption, function(err, info){
            if(err)
                console.log(err)
            else
                console.log("ENVIADO");
        })
    next()
}

var rodar = function(){ app.use('/teste', express.static(__dirname + '/teste')) }

app.post('/', [teste, (req, res) =>{
    rodar
    res.get('Content-Type')
}])

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/views/Index.html")
})

app.listen(3000,()=>{
    console.log("Rodando")
})
