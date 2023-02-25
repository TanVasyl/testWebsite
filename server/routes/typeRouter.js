const Router = require('express')
const router = new Router();
const typeControler = require('../controlers/typeControler');
const checkRoleMidleware = require('../midleware/checkRoleMidleware');

router.post('/', checkRoleMidleware('ADMIN'), typeControler.create)
router.get('/',typeControler.getAll)

module.exports = router