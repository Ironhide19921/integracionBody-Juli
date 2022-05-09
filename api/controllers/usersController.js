const neoLogger = require("../modules/Logger");
const usersModels = require("../model/usersModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res, next) {
    try {
        let user = await usersModels.find({ name: req.body.name });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ user: user._id }, req.app.get('secretKey'), { expiresIn: '1h' })
                res.json({ error: false, data: { token: token, user: user } });
            } else {
                res.json({ error: true, message: "Usuario o contraseña incorrectos." });
            }
        } else {
            res.json({ error: true, message: "Usuario o contraseña incorrectos." });
        }
    } catch (e) {
        neoLogger.logError("Error calling Users->login", e.message);
        console.log(e)
        next(e)
    }
}

module.exports = {
    login: login
}
