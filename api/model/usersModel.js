const siteConfig = require('../modules/Config');
const bcrypt = require('bcrypt');
const saltOrRounds = 10;


async function find(user) {
    /**
     * Usuario prueba para autenticacion
     * En la practica deben estar en una base de datos.
     */
    if (user.name == siteConfig.authentication.admin.name) {
        return { name: user.name, password: bcrypt.hashSync(siteConfig.authentication.admin.password, saltOrRounds) }
    } else {
        return false;
    }
}
// hash user password before saving into database

module.exports = {
    find: find
}