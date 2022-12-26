 const router = require("express").Router()

// todas as rotas a partir de /algumaCoisa vai vir do item 

const userRouter = require("./user")
router.use("/user", userRouter)
 
const itemRouter = require("./itens")
router.use("/item", itemRouter) 

const mealsRouter = require("./meals")
router.use("/meals", mealsRouter);


module.exports = router;
