const ApiError = require('../error/APIError')
const UserService = require('../service/userService')

class UserControler {

    async registration (req, res, next) {
    
    }
    async login (req, res, next) {
 
    }
    async check (req, res, next) {
        const {id} = req.query
        if(!id) {
            return next(ApiError.BadRequest('Не задан Id'))
        }
        res.json(id)
    }
}

module.exports = new UserControler()



// class UserControler {
//     async registration (req, res, next) {
//         try {
//             const {password, login} = req.body;
//             const userData = await UserService.registration(password, login)
//             return res.send(userData)
//         } catch(e) {
//             console.log(e);
//         }
//     }
//     async auth (req, res, next) {
//         try {
//             const { login, password} = req.body
//             const userAuth = await UserService.auth(password, login)
//             return res.send({
//                 user:{
//                     id: userAuth.id,
//                     login:userAuth.login
//                 } 
//             })
//         } catch(e) {
//            res.send({message: `Неверно введены данные`});
//         }
//     }
// }

// module.exports = new UserControler()