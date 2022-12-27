const router = require("express").Router()

const userController = require("../Controllers/userController")
const authentication = require("../middleware/authentation");

router.get("/:id", authentication.checkUserToken, userController.getById);

router.post("/register", userController.create);

router.post("/login", userController.login);

router.delete("/:id", authentication.checkUserToken, userController.delete);

router.put("/:id", authentication.checkUserToken, userController.update);

module.exports = router; 