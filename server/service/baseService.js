const notAuthUser = require('./userBD/notAuthUser.json')
const userDBPath = __dirname + '/userBD/notAuthUser.json'
const tokenService = require('./tokenService')
const fs = require('fs');
const uuid = require('uuid')
const jwt = require('jsonwebtoken');

class BaseService {
    createSession(id) {
        const notAuthid = uuid.v4()
        const token = tokenService.generated(id || notAuthid)
        if(id === undefined) {
            notAuthUser.push({
                id: notAuthid,
                token: token
            })
            fs.writeFile(userDBPath, JSON.stringify(notAuthUser), (err,data) => {
                err ? console.log(err) : console.log('notAuthUser update')})
            return token
       } else {
            return token
       }
    }
    checkSession(token) {
        const tokenId = jwt.verify(token,process.env.ACCESS_SECRET) 
        const checkSession = notAuthUser.find((elem) => elem.id === tokenId)
        return checkSession
    }
}
module.exports = new BaseService();