// imports

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()


// Models

const User = require("./models/User")

// open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Welcome to CANTECO API" })
})

// Prive route - info user por id

app.get("/user/:id",checkToken, async (req, res) =>{
    
    const id = req.params.id

    // check if user exists
   
    const user = await User.findById(id, '-password') // exclui a password

    if(!user){
        return res.status(404).json({msg: 'User not found'})
    } 

    res.status(200).json({ user })
     
})

// funcao para fazer rota privada, criando um fun verificando o token

// next é sucesso, prossiga 

function checkToken(req, res, next){
    const authHeader = req.headers[`authorization`]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token){
        return res.status(401).json({msg: 'acesso negado! You need a token'})
    }
    try{
        const secret = process.env.SECRET

        jwt.verify(token, secret)
        
        next()

    }catch(error){
        res.status(400).json({msg: 'token invalido!'})
    }
}



//Config JSON response, express ler o json 

app.use(express.json())

/* Registe User */

app.post('/auth/register', async (req, res) => {

    const { name, email, password, comfirmPassword } = req.body

    // validations //
    if (!name) {
        return res.status(422).json({ msg: "Required Name" })
    } else if (!email) {
        return res.status(422).json({ msg: "Required Email" })
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
        } /* else {
            return res.status(422).json({ msg: 'User not found' })
        } */

        // create password 

        const salt = await bcrypt.genSalt(12) //adicionar digitos a mais para dificultar a leitura da senha 
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: passwordHash,
        })

        // validação de erro 

        try {

            await user.save()

            res.status(201).json({ msg: 'user criado com sucesso' })

        } catch (error) {
            console.log(error);

            res.status(500).json({ msg: 'Aconteceu um erro servidor tente novamente mais tarde!' })

        }
    }

})

/* Auth login user */

app.post("/auth/login", async (req, res) => {

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
    try{
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id
        }, secret
        )

        res.status(200).json({msg: 'autenticacao feita com sucesso', token})

    }catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Aconteceu um erro servidor tente novamente mais tarde!' })
    }



})

// credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.5d9r5hl.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000)
        console.log('conectou a database');
    })
    .catch((err) => console.log(err))


console.log(123)