const router = require("express").Router()

const priceController = require("../Controllers/priceController")

const authentication = require("../middleware/authentation");

router.post("/", authentication.checkAdminToken, priceController.create);

router.get("/", authentication.checkUserToken, priceController.getAll);

router.get("/:id", authentication.checkUserToken, priceController.get);

router.delete("/:id", authentication.checkAdminToken, priceController.delete);

router.put("/:id", authentication.checkAdminToken, priceController.update);

module.exports = router; 