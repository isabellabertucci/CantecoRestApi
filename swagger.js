const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./Backend/routes/user.js', './Backend/routes/item.js', './Backend/routes/price.js', './Backend/routes/meal.js']

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Canteco api document",
            version: "1.0.0",
            description: "Canteco Project Application API",
            contact: {
                email: "isabella@example.com"
            },
        },
        schemes: ["https", "http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        securityDefinitions: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
};

swaggerAutogen(outputFile, endpointsFiles, options).then(() => {
    require('./app.js')
});