const router = require("express").Router()

const itemController = require("../Controllers/itemController")

const authentication = require("../middleware/authentation");

router.post("/", authentication.checkAdminToken, itemController.create);

router.get("/", authentication.checkUserToken, itemController.getAll);

router.get("/:id", authentication.checkUserToken, itemController.get);

router.delete("/:id", authentication.checkAdminToken, itemController.delete);

router.put("/:id", authentication.checkAdminToken, itemController.update);

module.exports = router; 