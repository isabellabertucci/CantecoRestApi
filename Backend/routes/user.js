const router = require("express").Router()

const userController = require("../Controllers/userController")
const authentication = require("../middleware/authentation");


router.get("/user/:id", authentication.checkUserToken, userController.getById);

router.post("/user/register", userController.create);

router.post("/user/login", userController.login);

router.delete("/user/:id", authentication.checkUserToken, userController.delete);

router.put("/user/:id", authentication.checkUserToken, userController.update);

module.exports = router; 