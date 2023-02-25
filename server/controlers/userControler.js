const ApiError = require('../error/APIError')
const { User, Basket } = require('../models/models')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(7);
const jwt = require('jsonwebtoken')

const generateJwt = (id, login, role) => {
   return jwt.sign(
        {id,login,role}, 
            process.env.ACCESS_SECRET,
        {
            expiresIn: '24h'
        }
    )
    
}
class UserControler {

    async registration (req, res, next) {
        const {login, password, role} = req.body
        if(!password || !login) {
            return next(ApiError.BadRequest('Некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where: {login}})
        if(candidate) {
            return next(ApiError.Forbidden('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await User.create({login, password:hashPassword, role})
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }
    async login (req, res, next) {  
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if(!user) {
            return next(ApiError.NotFound('Пользователь с таким именем не найдет'))
        }
        let checkPassword = bcrypt.compareSync(password, user.password)
        if(!checkPassword) {
            return next(ApiError.Forbidden('Неверный пароль'))
        }
        const token = generateJwt(user.id, login, user.role)
        return res.json({token})
    }
    async check (req, res, next) {
        const {id, login, role} = req.user
        const token = generateJwt(id, login, role)
        return res.json({token})
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