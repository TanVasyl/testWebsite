const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const meals = require('./meals.json')
const userBD = require('./user.json')
const userDBPath = __dirname + '/user.json'
const salt = bcrypt.genSaltSync(7);
const secret = '20a5'

const jsonBody = express.json()
app.use(jsonBody)
app.use('/',express.static(path.join(__dirname + '/Image')));
app.use(cors({
    origin: '*'
}));

// шифрование
const tokenSession = jwt.sign({ data: 'testToken' }, secret);
// проверка и расшифровка
const decoded = jwt.verify(tokenSession, secret);

const notAuthCart = []

app.get('/', cors(),  function (req, res) {
    res.json({meals, tokenSession})
  })

app.post('/auth', cors(), async function (req, res) {
    const { user, password} = req.body
    const person = userBD.find((elem) =>{
        if (elem.name === user){
            return elem.password
        }})
    const validPassword = await bcrypt.compareSync(password, person.password)
        if(validPassword === false) {
            res.status(404).send({
                message:'password or login not valid'})
        } else{
        res.status(200).send({
            id: person.id,
            name: person.name,
            })
        }
})
  
app.post('/registr', cors(), async function(req, res) {
    const {password, user} = req.body
    const hashpassword = bcrypt.hashSync(password, salt);
    if(userBD.find((elem) => elem.name === user)) {
        return res.status(400).send({message:`Пользователь с таким именем существует`})
    } else {  
        const createUser = {
            id: +(new Date()),
            name: user,
            password: hashpassword
            }
        userBD.push(createUser)
        fs.writeFile(userDBPath, JSON.stringify(userBD), (err,data) => {
            err ? console.log(err) : console.log('user created');
        })
        res.status(201).json(user)
    }
})

app.post('/cart', cors(), function(req, res) {
    const { meals, token } = req.body
    console.log(meals);
    if (token === tokenSession) {
        if(notAuthCart.find((elem) => elem.id === meals.id)){
            return notAuthCart,
            res.status(200).send({message:`Товар уже добавлен`})
        } else {
            return notAuthCart.push(meals),
            console.log(notAuthCart + ' cart'),
            res.status(200).send({message:`Товар добавлен в корзину`})
        }
    } else {
        return res.status(400).send({message: `bad request`})
    }
})
app.post('/cart/items', cors(), function(req, res) {
    const { token } = req.body
    if(token.toString() === tokenSession.toString()) { 
        res.status(200).send(notAuthCart)
    } else {
        res.status(404).send({message: 'not found'})
    }
})
app.listen(5000)