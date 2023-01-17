const router = require("express").Router()

const priceController = require("../Controllers/priceController")

const authentication = require("../middleware/authentation");

router.post("/prices/", authentication.checkAdminToken, priceController.create);

router.get("/prices/", priceController.getAll);

router.get("/prices/:id", priceController.get);

router.delete("/prices/:id", authentication.checkAdminToken, priceController.delete);

router.put("/prices/:id", authentication.checkAdminToken, priceController.update);

module.exports = router; 


