import Express from "express";
import {lista} from '../controlador/controlador_usuarios.js'

const rota = Express.Router()

rota.get('/lista', lista)

export {rota}