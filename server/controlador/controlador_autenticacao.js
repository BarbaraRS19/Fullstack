import { User } from "../db.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const registro = async (req, res) => {
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
 }
 
const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send('Preencha todos os campos!');
    }
    const userExiste = await User.findOne({ where: { email } });
    if (!userExiste) {
        return res.status(404).send('Usuário não encontrado');
    }
    const senhaValida = await bcryptjs.compare(senha, userExiste.senha);
    if (!senhaValida) {
        return res.status(401).send('Senha inválida');
    }
    const token = jsonwebtoken.sign(
                {"nome_completo" : `${userExiste.nome} ${userExiste.sobrenome}`, 
                "email" : userExiste.email,
                "status" : userExiste.status},
                'chavecriptografiajwt',
                {expiresIn: 1000*60*5}
            )
            res.status(200).send({
                msg: "Usuario Logado",
                tokenJWT: token,
                userInfo: userExiste
            })
         }


 const mudarSenha = async(req, res) => {
    const user_id = req.params.id
    const {nova_senha} = req.body
    if (!nova_senha) {
        res.status(400).send('Todos os campos devem ser preenchidos')
        return
    }
    const user = await User.findOne({where:{id: user_id}})
    if(!user){
        res.status(404).send('User Not Found')
        return
    }
    const senhaCriptografada = bcryptjs.hashSync(nova_senha, 10)
    user.senha = senhaCriptografada
    await user.save()
    res.status(200).send(user)
}




export {registro, login, mudarSenha}