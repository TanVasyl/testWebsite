const express = require('express');
const Router = express.Router
const UserControler = require('../controlers/userControler')
const BaseControler = require('../controlers/baseControler')
const CartControler = require('../controlers/CartControler')
const router = new Router();

router.post('/auth', UserControler.auth)
router.post('/registr', UserControler.registration)
router.post('/post', CartControler.addItemCart)
router.post('/cart/items', CartControler.removeItem)

router.put('/cart/items/minus', CartControler.itemMinus)
router.put('/cart/items/plus', CartControler.itemPlus)

router.get('/', BaseControler.getData)
router.post('/cart', CartControler.getCart)


module.exports  = router