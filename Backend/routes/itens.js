const router = require("express").Router() 

const itemController = require("../Controllers/itensController")

router.route("/itens").post((req, res) => itemController.create(req, res));

router.route("/itens").get((req, res) => itemController.getAll(req, res));

router.route("/itens/:id").get((req, res) => itemController.get(req, res));

router.route("/itens/:id").delete((req, res) => itemController.delete(req, res));

router.route("/itens/:id").put((req, res) => itemController.update(req, res));

module.exports = router; 