const Router = require('express')
const router = new Router();
const CartControler = require('../controlers/CartControler')

router.post('/add', CartControler.addFood)
router.post('/', CartControler.getCart)
router.delete('/', CartControler.deleteFood)
router.put('/dec', CartControler.decrement)
// router.get('/:id')

module.exports = router