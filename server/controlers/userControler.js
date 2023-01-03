const UserService = require('../service/userService')

class UserControler {
    async registration (req, res, next) {
        try {
            const {password, user} = req.body;
            const userData = await UserService.registration(password, user)
            return res.send(userData)
        } catch(e) {
            console.log(e);
        }
    }
    async auth (req, res, next) {
        try {
            const { user, password} = req.body
            const userAuth = await UserService.auth(password, user)
            return res.send({
                user:{
                    id: userAuth.id,
                    name:userAuth.name
                } 
            })
        } catch(e) {
           res.send({message: `Неверно введены данные`});
        }
    }
}

module.exports = new UserControler()