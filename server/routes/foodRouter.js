const Router = require('express')
const router = new Router();
const FoodControler = require('../controlers/FoodControler')

router.post('/',FoodControler.create)
router.get('/',FoodControler.getAll)
router.get('/:id',FoodControler.getOne)

module.exports = router