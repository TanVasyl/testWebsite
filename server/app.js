require('dotenv').config()
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT
const router = require('./routes/index.js')

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