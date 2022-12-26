const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
    
const userController = {


    login: async (req, res) => {

        const { email, password } = req.body

        // validations 
        if (!email) {
            return res.status(422).json({ msg: "Required Email" })
        }

        if (!password) {
            return res.status(422).json({ msg: "Required Password" })
        }

        // check if users exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }

        // check if password match

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({ msg: 'Invalid Password' })
        }

        //validação auth
        try {
            const secret = process.env.SECRET

            const token = jwt.sign(
                { id: user._id, userRole: user.userRole },
                secret
            )

            res.status(200).json({ msg: 'sucessfully authenticated', token, userId: user._id })

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Servor error. Try again later' })
        }
    },

    getById: async (req, res) => {

        const id = req.params.id

        const user = await User.findById(id, '-password') // exclui a password
        res.status(200).json({ user })

    },

    create: async (req, res) => {

        const { name, email, password, userRole, comfirmPassword } = req.body

        // validations 
        if (!name) {
            return res.status(422).json({ msg: "Required Name" })
        } else if (!email) {
            return res.status(422).json({ msg: "Required Email" })
        } else if (!userRole) {
            return res.status(422).json({ msg: "Required Role" })
        } else if (!password) {
            return res.status(422).json({ msg: "Required Password" })
        } else if (password !== comfirmPassword) {
            return res.status(422).json({ msg: "Password doesn't match " })
        } else {
            const userExists = await User.findOne({ email: email })
            console.log(userExists)

            //check if user exists
            if (userExists) {
                return res.status(422).json({ msg: 'Email alredy exists' })
            }

            // create password 

            const salt = await bcrypt.genSalt(12) //adicionar digitos a mais para dificultar a leitura da senha 
            const passwordHash = await bcrypt.hash(password, salt)

            const user = new User({
                name,
                email,
                userRole,
                password: passwordHash,
            })

            // validação de erro 

            try {

                await user.save()

                res.status(201).json({ msg: 'user criado com sucesso' })

            } catch (error) {
                console.log(error);

                res.status(500).json({ msg: 'Server error. Try again' })

            }
        }
    },

    delete: async (req, res) => {
        try {

            const id = req.params.id

            const user = await User.findById(id)

            if (!user) {
                res.status(404).json({ msg: "user not found" });
                return;
            }

            var deleted = await User.findByIdAndDelete(user._id)

            if (deleted != null) {
                res.status(200).json({ msg: "User deleted" })
            } else {
                res.status(500).json({ msg: "Some problem occurred" })
            }

        } catch (error) {
            console.log(error);
        }
    },

    update: async (req, res) => {
        const id = req.params.id

        const user = await User.findById(id);

        if (user == null) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        const { name, email, password, userRole, comfirmPassword } = req.body

        // validations 
        if (!name) {
            return res.status(422).json({ msg: "Required Name" })
        } else if (!email) {
            return res.status(422).json({ msg: "Required Email" })
        } else if (!userRole) {
            return res.status(422).json({ msg: "Required Role" })
        } else if (!password) {
            return res.status(422).json({ msg: "Required Password" })
        } else if (password !== comfirmPassword) {
            return res.status(422).json({ msg: "Password doesn't match " })
        } else {

            //Atualizar email so se o email for diferente do actual.
            if (user.email != email) {
                const userExists = await User.findOne({ email: email });
                console.log(userExists)

                //check if user exists
                if (userExists) {
                    return res.status(422).json({ msg: 'Email alredy exists' })
                }

            }

            // create password 
            const salt = await bcrypt.genSalt(12) //adicionar digitos a mais para dificultar a leitura da senha 
            const passwordHash = await bcrypt.hash(password, salt)

            const userUpdated = {
                name,
                email,
                userRole,
                password: passwordHash,
            }

            try {

                await User.findByIdAndUpdate(id, userUpdated);
                res.status(200).json({ msg: 'user updated' })

            } catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Some problem occured' })
            }
        }
    }
}

module.exports = userController;