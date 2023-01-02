const router = require("express").Router()

const priceController = require("../Controllers/priceController")

const authentication = require("../middleware/authentation");

router.post("/prices/", authentication.checkAdminToken, priceController.create);

router.get("/prices/", authentication.checkUserToken, priceController.getAll);

router.get("/prices/:id", authentication.checkUserToken, priceController.get);

router.delete("/prices/:id", authentication.checkAdminToken, priceController.delete);

router.put("/prices/:id", authentication.checkAdminToken, priceController.update);

module.exports = router; 