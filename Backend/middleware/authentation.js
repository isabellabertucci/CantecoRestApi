const jwt = require('jsonwebtoken')

const Authentication = {

    checkUserToken: async (req, res, next) => {
        const authHeader = req.headers[`authorization`]
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) return res.status(401).json({ msg: 'Access denied! You need a token' })

        try {
            const secret = process.env.SECRET
            jwt.verify(token, secret)
            next()

        } catch (error) {
            res.status(400).json({ msg: 'Invalid token!!' })
        }
    },

    checkAdminToken: async (req, res, next) => {
        const authHeader = req.headers[`authorization`]
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) return res.status(401).json({ msg: 'Access denied! You need a token' })

        try {
            const authHeader = req.headers[`authorization`]
            const token = authHeader && authHeader.split(" ")[1]

            if (!token) return res.status(401).json({ msg: 'Access denied! You need a token' })

            const secret = process.env.SECRET
            
            //decoded is the data inside the jwt.
            jwt.verify(token, secret, function (err, decoded) {
                if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
                if (decoded["userRole"] != "admin") return res.status(401).json({ message: 'Unauthorized client' });
                next()
            });

        } catch (error) {
            res.status(400).json({ msg: 'Invalid token!' })
        }
    }
}

module.exports = Authentication;