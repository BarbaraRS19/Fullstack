import { User } from "../db.js";

const lista = async (req, res) => {
    const users = await User.findAll({
        attributes: ['nome', 'email', 'status']
    });
    res.send(users);
}

const deleta = async (req, res) => {
    const users_id = req.params.id
    const users = await User.destroy ({where:{id:users_id}})
    res.send('Usuario deletado')
}

const pega = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findOne ({where:{id:user_id}})
    res.send(user)
}

const trocaImg = async (req, res) => {
  const user_id = req.params.id
  const nova_img_url = req.body.url
  if (!nova_img_url) {
      res.status(400).send('Imagem nao encontrada')
      return
  }
  const user = await User.findOne({where:{id: user_id}})
  if(!user){
      res.status(404).send('User nao encontrada')
      return
  }
  user.profile_image = nova_img_url
  await user.save()
  res.status(200).send(user)
}

export { lista, deleta, pega, atualizaUser};
