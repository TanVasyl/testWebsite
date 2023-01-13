const meals = require('.././meals.json')
const BaseService = require('../service/baseService')

class BaseControler {
    async getData (req, res, next) {
        const {id, token} = req.headers
        try {
            if(id === undefined) {
                if(token) {
                    const checktoken = BaseService.checkSession(token)
                    const data = {
                        accessToken: checktoken.token.accessToken
                    }
                    res.status(200).send({data, meals})
                } else {
                    const data = BaseService.createSession(id)
                    res.status(200).send({data, meals})
                }
               
            } else {
                const data = BaseService.createSession(id)
                res.status(200).send({data, meals})
            }
        } catch(e) {
           res.status(400).send(console.log(e));
        }
    }
}

module.exports = new BaseControler()