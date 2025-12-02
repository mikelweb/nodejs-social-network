const User = require("../model/user")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    // get req data
    const params = req.body;

    if(!params.name || !params.surname || !params.nick || !params.password) {
        return res.status(400).json({
            "status": "error",
            "message": "Faltan datos de registro de usuario"
        });
    }

    try {
        const users = await User.find({
            $or: [
                {email: params.email.toLowerCase()},
                {nick: params.nick.toLowerCase()}
            ]
        })

        if(users && users.length > 0) {
            return res.status(400).json({
                "status": "error",
                "message": "Ya existe un usuarios registrado con ese email o nick"
            });
        }

        params.password = await bcrypt.hash(params.password, 10)

        let user = new User(params);

}

module.exports = {
    register
}