const router = require("express").Router()

const mealsController = require("../Controllers/mealsController")

const authentication = require("../middleware/authentation");

router.post("/", authentication.checkAdminToken, mealsController.create);

router.get("/", authentication.checkUserToken, mealsController.getAll);

router.get("/:id", authentication.checkUserToken, mealsController.get);

router.delete("/:id", authentication.checkAdminToken, mealsController.delete);

router.put("/:id", authentication.checkAdminToken, mealsController.update);

module.exports = router; 