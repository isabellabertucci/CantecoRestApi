const router = require("express").Router() 

const mealsController = require("../Controllers/mealsController")

router.route("/meals").post((req, res) => mealsController.create(req, res))

module.exports = router; 