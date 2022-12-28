// imports

require('dotenv').config()
const express = require('express');

const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./Backend/swagger.json");
const cors = require("cors");

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

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// routes to http client.
app.use("/user", userRoutes);
app.use("/items", itemRoutes);
app.use("/meals", mealRoutes);
app.use("/prices", priceRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

//DATABASE
const dataBase = require("./Backend/db/database");

dataBase();

app.use((req, res, next) => {
    next(res.status(404).json({ msg: "Url not found" }));
});

app.listen(3000, function () {
    console.log("Api online!");
})

