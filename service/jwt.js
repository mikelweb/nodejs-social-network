const jwt = require("jwt-simple")
const moment = require("moment")

// Secert key
const secret = "hcv32hgb78t7y87%#&gerg5e43545ree";

const createToken = (user) => {

    const payload = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    return jwt.encode(payload, secret);
}

module.exports = {
    secret,
    createToken
}