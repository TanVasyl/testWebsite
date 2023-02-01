require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT
const router = require('./routes/index.js')
const sequelize = require('./db')
const ErrorHandler = require('./midleware/ErrorHandlingMidleware')
const fileUpload = require('express-fileupload')
const qe = require('./')

app.use(express.json())
app.use('/',express.static(path.join(__dirname + '/static')));
app.use(cors({
    origin: '*'
}));
app.use(fileUpload({}))
app.use('/api', router);


app.use(ErrorHandler) // последний midleware
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server work on ${PORT}` ))
    }
    catch(e) {
        console.log(e);
    }
}
start()