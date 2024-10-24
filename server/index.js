import Express from "express";
import { criarTabelas, User } from "./db.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cors from "cors"

const App = Express()
App.use(Express.json())
App.use(cors())
//criarTabelas()

App.post('/registro', async (req, res) => {
   const {nome, sobrenome, email, senha, dataNascimento} = req.body
   if(!nome || !sobrenome || !email || !senha || !dataNascimento){
   res.send('Preencha todos os campos!')
   return
   }
   const userExiste = await User.findOne({where: {email: email}})
   if(userExiste){
    res.send('Usuario já existe')
    return
   }
   const senhaCriptografada = bcryptjs.hashSync(senha, 10)
   const usuarioCriado = await User.create({nome, sobrenome, email, senha: senhaCriptografada, dataNascimento})
    res.send('Esta funcionando')
})

App.post('/login', async (req, res) => {
    const {email, senha} = req.body
    if(!email || !senha){
    res.send('Preencha todos os campos!')
    return
    }
    const userExiste = await User.findOne({where: {email: email}})
    if(!userExiste){
     res.send('Usuario nao existe')
     return
    }
    const senhaValida = bcryptjs.compareSync(senha, userExiste.senha)
    if(!senhaValida){
        res.send('Senha Invalida')  
        return
    }
    const token = jsonwebtoken.sign(
        {"nome_completo" : `${userExiste.nome} ${userExiste.sobrenome}`, 
        "email" : userExiste.email,
        "status" : userExiste.status},
        'chavecriptografiajwt',
        {expiresIn: 1000*60*5}
    )
    res.send({
        msg: "Usuario Logado",
        tokenJWT: token
    })
 })
 
 App.listen(8000)