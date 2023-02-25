const uuid = require('uuid')
const path = require('path')
const {Basket, Basket_food, Food} = require('../models/models')
const ApiError = require('../error/APIError')
const jwt = require('jsonwebtoken')
const { model, Sequelize } = require('../db')

const findBasket = async (token) => {
    const {id} = await jwt.verify(token, process.env.ACCESS_SECRET)
    const cart = await Basket.findOne({where:{userId:id}})
    return cart
}
class CartControler {
    async getCart(req, res, next) {
        const {token} = req.body
        const cart = await findBasket(token)
        const userCart = await Basket_food.findAll({
            where:{basketId:cart.id}, 
            raw:true,
            order: Sequelize.literal('id')
        })
        const findFood = await Food.findAll({
            where:{id: userCart.map(elem => elem.foodId)},
            raw:true, 
            include: {
                model: Basket_food,
            }, 
            order: Sequelize.literal('id')
        })
        let count = userCart.map((count) => {
           return count.count
        })
        const item = findFood.map((elem,ind) => {
            return {
                id:elem.id, 
                name: elem.name, 
                price:elem.price, 
                rating:elem.rating, 
                Image:elem.Image, 
                count: count[ind]
            }
        })
        res.json(item)
    }
    async addFood(req,res,next) {
        const {token, meals} = req.body
        const cart = await findBasket(token)
        const checkFoodInCart = await Basket_food.findOne({where:{foodId:meals.id}})
        if(checkFoodInCart) {
            const incCount = await Basket_food.update({
                count: Sequelize.literal(`count + 1`)},{where: {foodId:meals.id}
            })
            res.json(incCount)
        } else {
            const basketFood = await Basket_food.create({
                basketId:cart.id,
                foodId:meals.id})
            res.json(basketFood)
        }
    }
    async deleteFood(req,res,next) {
        const {id} = req.headers
        const basketFood = await Basket_food.destroy({where:{foodId:id}})
        res.json(basketFood)
    }
    async increment(req,res,next){
        const {id} = req.body
        const incCount = await Basket_food.update({count: Sequelize.literal(`count + 1`)} , {where: {foodId:id} })
        res.json(incCount)
    }
    async decrement(req,res,next){
        const {id} = req.body
        const checkFoodInCart = await Basket_food.findOne({where:{foodId:id}, raw:true})
        if(checkFoodInCart.count === 1) {
            const basketFood = await Basket_food.destroy({where:{foodId:id}})
            res.json(basketFood)
        }else {
            const decCount = await Basket_food.update({count: Sequelize.literal(`count - 1`)} , {where: {foodId:id} })
            res.json(decCount)
        }
   
    }
}
module.exports = new CartControler()






























// const CartService = require('../service/CartService')
// const jwt = require('jsonwebtoken');
// const user = require('../service/userBD/user.json')
// const notAuthUser = require('../service/userBD/notAuthUser.json')

// class CartControler {
    
//     async getCart(req,res,next) {
//        const { token } = req.body
//         const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
//         try {
//             const cart = await CartService.getCart(tokenId)
//             return res.send(cart)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     async addItemCart(req,res,next) {
//         try {
//             const {meals, token } = req.body
//             const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
//             const addItem = await CartService.addItem(meals,tokenId)
//             return res.send(addItem)
//         } catch (error) {
//             return res.status(400).send({message:`Товар добавлен в корзину`})
//         }
//     }
//     async removeItem(req,res,next) {
//         try {
//             const {meals, token } = req.body
//             const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
//             const updCart = await CartService.removeItem(meals.id,tokenId )
//             return res.send(updCart)
//         } catch (error) {
//             return res.status(400).send({message: 'Ошибка запроса'})
//         }
//     }
//     async itemPlus(req,res,next) {
//         try {
//             const {id, token} = req.body
//             const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
//             const itemPlus = await CartService.incCount(id,tokenId)
//             return res.send(itemPlus)
//         } catch (error) {
//             return res.status(400).send({message:`Ошибка запроса ${error}`})
//         }
//     }
//     async itemMinus(req,res,next) {
//         try {  
//             const {id, token} = req.body
//             const tokenId = jwt.verify(token,process.env.ACCESS_SECRET)
//             const itemMinus = await CartService.decCount(id, tokenId)   
//             return res.send(itemMinus)
//         } catch (error) {
//             return res.status(400).send({message:`Ошибка запроса ${error}`})
//         }
//     }

// }
// module.exports = new CartControler()