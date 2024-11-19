import Express from "express";

import cors from "cors";
import {rotas} from './roteamento/rotas_autenticacao.js';
import {rota} from  './roteamento/rota_usuarios.js'
import { rotas_artistas } from './roteamento/rota_artista.js'
import { rotas_albums } from "./roteamento/rota_album.js";

const App = Express()
App.use(Express.json())
App.use(cors())


App.use('/autenticacao', rotas)
App.use('/usuarios', rota)
App.use('/artista', rotas_artistas)
App.use('/album', rotas_albums)

App.listen(8000)
//import { criarTabelas } from "./db.js";
//criarTabelas()