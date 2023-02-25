const Router = require('express')
const router = new Router();
const UserControler = require('../controlers/userControler')
const authMidleware = require("../midleware/authMidleware")

router.post('/registration' ,UserControler.registration)
router.post('/login',UserControler.login)
router.get('/auth', authMidleware, UserControler.check)

module.exports = router