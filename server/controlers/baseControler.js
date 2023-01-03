const tokenService = require('../service/tokenService')
const meals = require('.././meals.json')

class BaseControler {
    async getData (req, res, next) {
        const token = tokenService.generated('test')
        try {
            res.status(200).send({token, meals})
            
        } catch(e) {
           res.status(400).send(console.log(e));
        }
    }
    async test (req, res, next) {
        try {
            
        } catch(e) {
            res.status(400).send(console.log(e));
        }
    }
}

module.exports = new BaseControler()