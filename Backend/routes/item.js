
const router = require("express").Router()

const itemController = require("../Controllers/itemController")

const authentication = require("../middleware/authentation");

router.post("/items/", authentication.checkAdminToken, itemController.create);

router.get("/items/", itemController.getAll);

router.get("/items/:id", itemController.get);

router.delete("/items/:id", authentication.checkAdminToken, itemController.delete);

router.put("/items/:id", authentication.checkAdminToken, itemController.update);

module.exports = router; 