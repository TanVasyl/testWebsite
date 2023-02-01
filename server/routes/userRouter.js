const Router = require('express')
const router = new Router();
const UserControler = require('../controlers/userControler')

router.post('/registration' ,UserControler.registration)
router.post('/login',UserControler.login)
router.get('/auth',UserControler.check)

module.exports = router