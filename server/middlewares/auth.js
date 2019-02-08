// imports
const jwt = require('jsonwebtoken');

// middleware para verficar el token
let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

module.exports = { verificarToken }