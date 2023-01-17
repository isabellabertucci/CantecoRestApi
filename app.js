// imports

require('dotenv').config();
const express = require('express');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const cors = require("cors");
const nodemailer = require("nodemailer");

const userRoutes = require("./Backend/routes/user");
const itemRoutes = require("./Backend/routes/item");
const mealRoutes = require("./Backend/routes/meal");
const priceRoutes = require("./Backend/routes/price");

const app = express()
app.use(cors());

//Config JSON response, express read json 
app.use(express.json())

// open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Welcome to CANTECO API" })
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// routes to http client.
app.use("/", userRoutes);
app.use("/", itemRoutes);
app.use("/", mealRoutes);
app.use("/", priceRoutes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, { swaggerOptions: { persistAuthorization: true } }))

//DATABASE
const dataBase = require("./Backend/db/database");

dataBase();

app.use((req, res, next) => {
    next(res.status(404).json({ msg: "Url not found" }));
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Api online!");
})


