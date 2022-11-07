const fs = require('fs');
const cors = require('cors')
const express = require('express')
const app = express()
const meals = require('../server/meals.json')

app.use(cors({
    origin: ['http://localhost:3000/']
}))
app.get('/', cors(), function (req, res) {
  
    if ( req.method === 'GET') {
        switch (req.url) {
            case '/':
                res.send(meals)
            break;
        }
    }
  })
  
  app.listen(5000)