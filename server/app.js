const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')

const meals = require('./meals.json')


app.use('/',express.static(path.join(__dirname + '/Image')));
app.use(cors({
    origin: ['http://localhost:3000/']
}));

app.get('/', cors(), function (req, res) {
    if ( req.method === 'GET') {
        switch (req.url) {
        case '/':
            res.json(meals)
        break;
        }
    }
  })
  
  app.listen(5000)