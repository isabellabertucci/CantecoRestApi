const router = require("express").Router()

const userController = require("../Controllers/userController")
const authentication = require("../middleware/authentation");


router.get("/user/:id", authentication.checkAdminToken, userController.getById);

router.post("/user/register", userController.create);

router.post("/user/login", userController.login);

router.get("/user/", userController.login);

router.delete("/user/:id", authentication.checkAdminToken, userController.delete);

router.put("/user/:id", authentication.checkAdminToken, userController.update);

module.exports = router; 