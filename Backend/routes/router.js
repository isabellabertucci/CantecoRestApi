 const router = require("express").Router()

// itens router

const itemRouter = require("./itens")

router.use("/", itemRouter) // todas as rotas a partir de /algumaCoisa vai vir do item 


// meals router

const mealsRouter = require("./meals")
router.use("/", mealsRouter)



module.exports = router;
