
const pruebaFollow = (req, res) => {
    return res.status(200).json(
        {
            "mensaje": "TODO OK FOLLOW"
        }
    );
}

module.exports = {
    pruebaFollow
}