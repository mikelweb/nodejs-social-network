const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("../service/jwt");

const register = async (req, res) => {
    // get req data
    const params = req.body;

    if(!params.name || !params.surname || !params.nick || !params.email || !params.password) {
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

        user.save()
        .then(item => {
            return res.status(200).json({
                status: "success",
                mensaje: "Accion de registro de usuario",
                user
            });
        })?.catch(error => {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al guardar el usuario",
                error
            });
        });

    }

    catch(error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al buscar usuarios",
            error
        });
    }
    
}

const login = async (req, res) => {
    // get req data
    const params = req.body;

    if(!params.email || !params.password) {
        return res.status(400).json({
            "status": "error",
            "message": "Faltan datos de login de usuario"
        });
    }

    const user = await User.findOne({
        email: params.email.toLowerCase()
    });

    if(!user) {
        return res.status(400).json({
            "status": "error",
            "message": "No existe ningún usuario registrado con ese email"
        });
    }

    const pwd = bcrypt.compareSync(params.password, user.password);
    if(!pwd) {
        return res.status(401).json({
            "status": "error",
            "message": "Contraseña incorrecta"
        });
    }

    // Call createToken
    const token = jwt.createToken(user);

    return res.status(200).json({
        status: "success",
        mensaje: "Accion de login de usuario",
        user: {
            id: user.id,
            name: user.name,
            nick: user.nick
        },
        token
    });
}

const profile = async (req, res) => {
    // Get URL param
    const nick = req.params.nick;

    const user = await User.findOne({
        nick: nick.toLowerCase()
    });

    if(!user) {
        return res.status(400).json({
            "status": "error",
            "message": "No existe ningún usuario con ese nick"
        });
    }

    return res.status(200).json({
        status: "success",
        mensaje: "Datos del usuario",
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            nick: user.nick,
            email: user.email,
            image: user.image
        }
    });
}
module.exports = {
    register,
    login,
}