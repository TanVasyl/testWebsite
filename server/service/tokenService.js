const jwt = require('jsonwebtoken');

class TokenService {
    generated(data) {
       const accessToken = jwt.sign(data, process.env.ACCESS_SECRET)
       return {
        accessToken
       }
    }
    saveToken(accessToken) {
       const token = accessToken
    }
}
module.exports = new TokenService();