import { User } from "../db.js";

const artista = async (req, res) => {
    const Artista = await User.findAll();
    if (!Artista) {
        return res.status(404).json({ error: 'Artista não encontrado' });
      }
    res.send(Artista);
}
 
const album = async (req, res) => {
    const Album = await User.findAll();
    if (!Album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }
    res.send(Album);
}

const musica = async (req, res) => {
    const Musica = await User.findByPk(req.params.id);
    if (!Musica) {
      return res.status(404).json({ error: 'Música não encontrada' });
    }
    res.json(Musica);
  } 

  const albuns = async (req, res) => {
    const Album_id = req.params.id
    const Album = await User.findOne ({where:{id:Album_id}})
    if (!Album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });
      }
    res.send(Album)
}

//app.get('/album/:id', async (req, res) => {
  //try {
    //const Album = await User.findByPk(req.params.id, {
      //include: [{
        //model: Musica,
        //as: 'Músicas'
      //}]
    //});

export { album, albuns, musica, artista};