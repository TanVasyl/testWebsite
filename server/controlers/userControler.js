const UserService = require('../service/userService')

class UserControler {
    async registration (req, res, next) {
        try {
            const {password, login} = req.body;
            const userData = await UserService.registration(password, login)
            return res.send(userData)
        } catch(e) {
            console.log(e);
        }
    }
    async auth (req, res, next) {
        try {
            const { login, password} = req.body
            const userAuth = await UserService.auth(password, login)
            return res.send({
                user:{
                    id: userAuth.id,
                    login:userAuth.login
                } 
            })
        } catch(e) {
           res.send({message: `Неверно введены данные`});
        }
    }
}

module.exports = new UserControler()