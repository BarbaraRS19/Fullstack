import Express from "express";
import {lista, deleta, pega} from '../controlador/controlador_usuarios.js'

const rota = Express.Router()

rota.get('/lista', lista)
rota.get('/:id', deleta)
rota.get('/:id', pega)

export {rota}