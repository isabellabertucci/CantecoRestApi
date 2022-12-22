// imports

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Config JSON response, express ler o json 

app.use(express.json())



// Models

const User = require("./Backend/models/User");
const Item = require("./Backend/models/Item");
const routes = require("./Backend/routes/router")


// open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Welcome to CANTECO API" })
})




//                                                          CREATE USER 



// Prive route - info user por id
// funcao para fazer rota privada, criando um fun verificando o token
app.get("/user/:id",checkToken, async (req, res) =>{
    
    const id = req.params.id

    // check if user exists
   
    const user = await User.findById(id, '-password') // exclui a password


    res.status(200).json({ user })
     
})


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
        } 

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

            res.status(500).json({ msg: 'Servor error. Try again later' })

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

        res.status(200).json({msg: 'sucessfully authenticated', token})

    }catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Servor error. Try again later' })
    }
})








//                                                          CREATE ITENS 
/* 
    app.post("/itens/create", async (req, res) => {
    const { itemName, kcal, image } = req.body

    // validations 
    if (!itemName) {
        return res.status(422).json({ msg: "Required itemName" })
    }

    if (!kcal) {
        return res.status(422).json({ msg: "Required kcal" })
    }
    if (!image) {
        return res.status(422).json({ msg: "Required image" })
    }else {
        const itemExists = await Item.findOne({ itemName: itemName })
        console.log(itemExists)
        //check if item exists
        if (itemExists) {
            return res.status(422).json({ msg: 'Item alredy exists' })
        } 

        const item = new Item({
            itemName,
            kcal,
            image,
        })

        // validação de erro 

        try {

            await item.save()

            res.status(201).json({ msg: 'Item criado com sucesso' })

        } catch (error) {
            console.log(error);

            res.status(500).json({ msg: 'nao criou nada sua burra' })

        }
    }
})
 */


//                                                         DATABASE

const conn = require("./Backend/db/conn");

conn();

app.use('/api',routes);




app.listen(3000, function(){
    console.log("Servidor online!");
})
    
