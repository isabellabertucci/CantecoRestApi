
const router = require("express").Router()

const mealsController = require("../Controllers/mealsController")
const authentication = require("../middleware/authentation");

router.post("/meals/", authentication.checkAdminToken, mealsController.create);

router.get("/meals/", mealsController.getAll);

router.get("/meals/:id",mealsController.get);

router.delete("/meals/:id", authentication.checkAdminToken, mealsController.delete);

router.put("/meals/:id", authentication.checkAdminToken, mealsController.update);

module.exports = router; 


