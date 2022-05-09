var express = require('express');
var router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const siteConfig = require('../modules/Config');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Node Express Swagger UI REST API Template', // Title (required)
            description: "A boilerplate to init a REST API project with expressJS, JWT authentication, bcrypt, swagger-express-UI and swagger-jsdoc",
            contact: {
                name: "Emiliano Noli"
            },
            version: '1.0.0', // Versión (required)
        },
        servers: ["http://localhost:" + siteConfig.serverPort.http],
        securityDefinitions: {
            jwt: {
                type: "apiKey",
                in: "header",
                name: "x-access-header"
            }
        },
        security: [
            {
                jwt: []
            }
        ],
    },
    // Path to the API docs
    apis: [siteConfig.path.root + 'routes/index.js', siteConfig.path.root + 'routes/users.js'],
};


// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec, { showExplorer: true }));

module.exports = router;