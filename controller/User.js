
const pruebaUser = (req, res) => {
    return res.status(200).json(
        {
            "mensaje": "TODO OK USER"
        }
    );
}

module.exports = {
    pruebaUser
}