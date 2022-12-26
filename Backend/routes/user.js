const router = require("express").Router() 

const userController = require("../Controllers/userController")
const authentication = require("../middleware/authentation");

router.get("/:id", authentication.checkUserToken, userController.getById);

router.post("/register", userController.create);

router.post("/login", userController.login);

router.delete("/:id", authentication.checkUserToken, userController.delete);

router.put("/:id", authentication.checkUserToken, userController.update);

// next é sucesso, prossiga
function checkToken(req, res, next) {
    const authHeader = req.headers[`authorization`]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).json({ msg: 'acesso negado! You need a token' })

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            console.log(decoded)
            next()
        });
    } catch (error) {
        res.status(400).json({ msg: 'token invalido!' })
    }
}

module.exports = router; 