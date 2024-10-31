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

export { lista, deleta, pega};
