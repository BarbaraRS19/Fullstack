import Express from "express";
import {registro, login, mudarSenha} from '../controlador/controlador_autenticacao.js'

const rotas = Express.Router()

rotas.post('/registro', registro)
rotas.post('/login', login)
rotas.put('/mudarSenha/:id', mudarSenha)

export {rotas}