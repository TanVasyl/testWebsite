const CartService = require('../service/CartService')
const jwt = require('jsonwebtoken');
const user = require('../service/userBD/user.json')
const notAuthUser = require('../service/userBD/notAuthUser.json')

class CartControler {
    
    async getCart(req,res,next) {
       const { token } = req.body
        const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
        try {
            const cart = await CartService.getCart(tokenId)
            return res.send(cart)
        } catch (error) {
            console.log(error);
        }
    }
    async addItemCart(req,res,next) {
        try {
            const {meals, token } = req.body
            const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
            const addItem = await CartService.addItem(meals,tokenId)
            return res.send(addItem)
        } catch (error) {
            return res.status(400).send({message:`Товар добавлен в корзину`})
        }
    }
    async removeItem(req,res,next) {
        try {
            const {meals, token } = req.body
            const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
            const updCart = await CartService.removeItem(meals.id,tokenId )
            return res.send(updCart)
        } catch (error) {
            return res.status(400).send({message: 'Ошибка запроса'})
        }
    }
    async itemPlus(req,res,next) {
        try {
            const {id, token} = req.body
            const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
            const itemPlus = await CartService.incCount(id,tokenId)
            return res.send(itemPlus)
        } catch (error) {
            return res.status(400).send({message:`Ошибка запроса ${error}`})
        }
    }
    async itemMinus(req,res,next) {
        try {  
            const {id, token} = req.body
            const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
            const itemMinus = await CartService.decCount(id, tokenId)   
            return res.send(itemMinus)
        } catch (error) {
            return res.status(400).send({message:`Ошибка запроса ${error}`})
        }
    }

}
module.exports = new CartControler()