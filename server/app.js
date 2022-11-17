const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');

const meals = require('./meals.json')
const user = require('./user.json')
const jsonBody = express.json()
const userDBPath = __dirname + '/user.json'
const salt = bcrypt.genSaltSync(7);

app.use(jsonBody)
app.use('/',express.static(path.join(__dirname + '/Image')));
app.use(cors({
    origin: '*'
}));


app.get('/', cors(), function (req, res) {
    res.json(meals)
  })
app.post('/auth', cors(), async function (req, res) {
    const person = user.find((elem) =>{
        if (elem.name === req.body.user){
            return elem.password
        }})
    const validPassword = await bcrypt.compareSync(req.body.password, person.password)
        if(validPassword === false) {
            res.status(404).send({
                message:'password or login not valid'})
        } else{
        res.status(200).send({
            message:'password and login valid',
            id: person.id,
            name: person.name,
            })
        }
})
  
app.post('/registr', cors(), async function(req, res) {
    const hashpassword = bcrypt.hashSync(req.body.password, salt);
    if(user.find((elem) => elem.name === req.body.user)) {
        return res.status(400).send({message:`Пользователь с таким именем существует`})
    } else {  
        const createUser = {
            id: +(new Date()),
            name: req.body.user,
            password: hashpassword
            }
        user.push(createUser)
        fs.writeFile(userDBPath, JSON.stringify(user), (err,data) => {
            err ? console.log(err) : console.log('user created');
        })
        console.log('Зарегистрирован' + '' + createUser)
        res.status(201).json(user)
    }
})
app.listen(5000)