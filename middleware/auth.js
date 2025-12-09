const jwt = require("jwt-simple")
const moment = require("moment")

// Import secet key
const libjwt = require("../service/jwt")
const secret = libjwt.secret

// Auth middleware function
exports.auth = (req, res, next) => {

    // Check auth headers
    if(!req.headers.authorization) {
        return res.status(401).json({
            "status": "error",
            "message": "No autorizado"
        });
    }

    // Clean token
    let token = req.headers.authorization.replace(/['"]+/g, '')

    // Decode token
    try {
        let payload = jwt.decode(token, secret);
        // Check token expiration
        if(payload.exp <= moment().unix()) {
            return res.status(401).json({
                "status": "error",
                "message": "Token expirado"
            });
        }

        // Add user data (payload) to request
        req.user = payload;

    } catch(error) {
        return res.status(401).json({
            "status": "error",
            "message": "Token no válido"
        });
    }

    // Continue execution
    next();
}
