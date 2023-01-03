const CartService = require('../service/CartService')

class CartControler {
    async getCart(req,res,next) {
        try {
            const cart = await CartService.getCart()
            return res.send(cart)
        } catch (error) {
            console.log(error);
        }
    }
    async addItemCart(req,res,next) {
        try {
            const {meals} = req.body
            const addItem = await CartService.addItem(meals)
            return res.send(addItem)
        } catch (error) {
            return res.status(400).send({message:`Товар добавлен в корзину`})
        }
    }
    async removeItem(req,res,next) {
        try {
            const { meals } = req.body
            const updCart = await CartService.removeItem(meals.id)
            return res.send(updCart)
        } catch (error) {
            return res.status(400).send({message: 'Ошибка запроса'})
        }
    }
    async itemPlus(req,res,next) {
        try {
            const {id} = req.body
            const itemPlus = await CartService.incCount(id)
            return res.send(itemPlus)
        } catch (error) {
            return res.status(400).send({message:`Ошибка запроса ${error}`})
        }
    }
    async itemMinus(req,res,next) {
        try {  
            const {id} = req.body         
            const itemMinus = await CartService.decCount(id)   
            return res.send(itemMinus)
        } catch (error) {
            return res.status(400).send({message:`Ошибка запроса ${error}`})
        }
    }

}
module.exports = new CartControler()