require('dotenv').config()
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT
const router = require('./routes/index.js')

const meals = require('./meals.json')
const userBD = require('./user.json')
const userDBPath = __dirname + '/user.json'
const salt = bcrypt.genSaltSync(7);
const secret = process.env.SECRET


app.use(express.json())
app.use('/',express.static(path.join(__dirname + '/Image')));
app.use(cors({
    origin: '*'
}));
app.use('/', router);


const start = async () => {
    try {
        app.listen(PORT, () => console.log('server work'))
    }
    catch(e) {
        console.log(e);
    }
}
start()