const fs = require('fs');
const path = require('path');
const siteLogger = require("../modules/Logger");
const siteConfig = require('../modules/Config');

async function homeView(req, res, next) {
    let angularPath = path.join(__dirname ,"../client/index.html");
    console.log("Agular path: ", angularPath);
    res.sendFile(angularPath);
}

async function authenticate(req, res, next) {
    try {
        res.status(200).json({ error: false, message: "User authenticated" });
    } catch (e) {
        console.log("Error calling Index->authenticate");
        console.log(e)
        next(e)
    }
}

module.exports = {
    authenticate: authenticate,
    home: homeView
}
