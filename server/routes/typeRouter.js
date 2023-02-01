const Router = require('express')
const router = new Router();
const typeControler = require('../controlers/typeControler')

router.post('/',typeControler.create)
router.get('/',typeControler.getAll)

module.exports = router