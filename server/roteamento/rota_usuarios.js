import Express from "express";
import {lista, deleta, pega, atualizaUser} from '../controlador/controlador_usuarios.js'

const rota = Express.Router()

rota.get('/lista', lista)
rota.get('/:id', deleta)
rota.get('/:id', pega)
rota.get('/profile/:id', atualizaUser)

export {rota}