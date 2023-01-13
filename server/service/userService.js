const userBD = require('./userBD/user.json')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(7);
const userDBPath = __dirname + '/userBD/user.json'

class UserService {
    async registration(password, login) {
        if(userBD.find((elem) => elem.name === login)) {
            throw new Error(`Пользователь с таким именем существует`)
        } else {  
            const hashpassword = await bcrypt.hashSync(password, salt);
            const createUser = {
                id: +(new Date()),
                login: login,
                password: hashpassword
                }
            userBD.push(createUser)
            fs.writeFile(userDBPath, JSON.stringify(userBD), (err,data) => {
                err ? console.log(err) : console.log('user created');
            })
        }
    }
    async auth(password,login) {
        const userRes = {
            id:null,
            login:''
        }
        const person =  userBD.find((elem) => {
            if(elem.login === login) {
                return elem
            }
        })
        const validPassword = await bcrypt.compareSync(password, person.password)
        if (validPassword) {
            return {
                ...userRes,
                id: person.id,
                login: person.login
            }
        } 
    }

}
module.exports = new UserService();
