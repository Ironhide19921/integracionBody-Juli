const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const siteLogger = require("../modules/Logger");

async function verifyToken(req, res, next) {

    jwt.verify(req.headers['x-access-header'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            siteLogger.log("Error verifying token", err.message);
            res.status(403).json({ error: true, message: err.message })
        } else {
            req.body.userToken = decoded
            next();
        }
    })
}

module.exports = {
    verifyToken: verifyToken
};