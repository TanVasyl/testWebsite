const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    console.log(req.headers.authorization);
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
           return res.status(401).json({message:"Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message:"Пользователь не авторизован"})
    }

}