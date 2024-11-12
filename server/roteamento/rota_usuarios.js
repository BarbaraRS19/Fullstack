import Express from "express";
import {lista, deleta, pega, envia} from '../controlador/controlador_usuarios.js'

const rota = Express.Router()

rota.get('/lista', lista)
rota.get('/:id', deleta)
rota.get('/:id', pega)
rota.get('/profile/:id', envia)

export {rota}