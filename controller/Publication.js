
const pruebaPub = (req, res) => {
    return res.status(200).json(
        {
            "mensaje": "TODO OK PUB"
        }
    );
}

module.exports = {
    pruebaPub
}