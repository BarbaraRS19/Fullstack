import Express from "express";
import {album, musica, artista, albuns} from '../controlador/controlador_home.js'

const Rota = Express.Router()

Rota.get('/album', album)
Rota.get('/:id', albuns)
Rota.get('/musica', musica)
Rota.get('/artista', artista)

export {Rota}