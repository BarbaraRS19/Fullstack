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
const atualizaUser = async (req, res) => {
      if (req.files) {
        const imageFile = req.files['profileImage'][0];
        const upload = await uploadImage(imageFile);
        if (upload !== 'err') {
          updatedData.profileImage = upload;
        } else {
          return res.status(500).json({ error: 'Erro ao fazer upload da imagem.' });
        }
      }
    }

export { lista, deleta, pega, atualizaUser};
