import { User } from "../db.js";

const lista = async (req, res) => {
    const users = await User.findAll({
        attributes: ['nome', 'email']
    });
    res.send(users);
}
export { lista };
