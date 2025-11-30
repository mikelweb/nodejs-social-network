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
        }
    );
}

module.exports = {
}