const router = require("express").Router() 

const mealsController = require("../Controllers/mealsController")

router.route("/meals").post((req, res) => mealsController.create(req, res));

router.route("/meals").get((req, res) => mealsController.getAll(req, res));

router.route("/meals/:id").get((req, res) => mealsController.get(req, res));

router.route("/meals/:id").delete((req, res) => mealsController.delete(req, res));

router.route("/meals/:id").put((req, res) => mealsController.update(req, res));


module.exports = router; 