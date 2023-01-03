const userBD = require('./userBD/user.json')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const e = require('express');
const salt = bcrypt.genSaltSync(7);
const userDBPath = __dirname + '/userBD/user.json'

class UserService {
    async registration(password, user) {
        if(userBD.find((elem) => elem.name === user)) {
            throw new Error(`Пользователь с таким именем существует`)
        } else {  
            const hashpassword = await bcrypt.hashSync(password, salt);
            const createUser = {
                id: +(new Date()),
                name: user,
                password: hashpassword
                }
            userBD.push(createUser)
            fs.writeFile(userDBPath, JSON.stringify(userBD), (err,data) => {
                err ? console.log(err) : console.log('user created');
            })
        }
    }
    async auth(password,user) {
        const userRes = {
            id:null,
            name:''
        }
        const person =  userBD.find((elem) => {
            if(elem.name === user) {
                return elem
            }
        })
        const validPassword = await bcrypt.compareSync(password, person.password)
        if (validPassword) {
            return {
                ...userRes,
                id: person.id,
                name: person.name
            }
        } 
    }

}
module.exports = new UserService();
