const Router = require('express')
const UserControler = require('../controlers/userControler')
const BaseControler = require('../controlers/baseControler')
const CartControler = require('../controlers/CartControler')

const foodRouter = require('./foodRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')
const router = new Router();


router.use('/food', foodRouter)
router.use('/user', userRouter)
router.use('/type',typeRouter)
router.use('/cart',cartRouter)

















// router.post('/auth', UserControler.auth)
// router.post('/registr', UserControler.registration)

// router.post('/post', CartControler.addItemCart)
// router.post('/cart/items', CartControler.removeItem)
// router.put('/cart/items/minus', CartControler.itemMinus)
// router.put('/cart/items/plus', CartControler.itemPlus)

// router.get('/', BaseControler.getData)
// router.post('/cart', CartControler.getCart)


module.exports  = router