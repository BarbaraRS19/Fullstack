import Express from "express";
//import { criarTabelas } from "./db.js";
import cors from "cors";
import {rotas} from './roteamento/rotas_autenticacao.js';
import {rota} from  './roteamento/rota_usuarios.js'

const App = Express()
App.use(Express.json())
App.use(cors())
//criarTabelas()

App.use('/autenticacao', rotas)
App.use('/usuarios', rota)

App.listen(8000)