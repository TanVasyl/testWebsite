const cart = require('./cartBD/cart.json')
const user = require('./userBD/user.json')
const cartPath = __dirname + '/cartBD/cart.json'
const fs = require('fs')


class CartService {
    async addItem(item ,tokenId){
        const findIndex = cart.findIndex((elem) => elem.id === tokenId)
        if(findIndex >= 0){
            if(cart[findIndex].items.find((elem) => elem.id === item.id)){
                return cart[findIndex].item
            } else {
            cart[findIndex].items.push(item)
                fs.writeFile(cartPath, JSON.stringify(cart), (err,data) => {
                    err ? console.log(err) : console.log('cart update')})
            }
        }
        else {
            cart.push({
                id:tokenId,
                items:[item]
            })
                fs.writeFile(cartPath, JSON.stringify(cart), (err,data) => {
                    err ? console.log(err) : console.log('cart create')})
            return cart
        }
    }
    async removeItem(id, tokenId){
        const findCart = cart.findIndex((elem)=> elem.id === tokenId)
        const findInd = cart[findCart].items.findIndex((elem) => elem.id === id)
        if(findInd>=0){
        cart[findCart].items.splice(findInd,1)
        fs.writeFile(cartPath, JSON.stringify(cart), (err,data) => {
            err ? console.log(err) : console.log('delete item')})
        } else {
            return cart
        }
    }
    async incCount(id, tokenId){
        const findCart = cart.findIndex((elem)=> elem.id === tokenId)
        const findItem = cart[findCart].items.find((elem)=> elem.id === id)
        const findInd = cart[findCart].items.findIndex((elem) => elem.id === id)
        if(findInd>=0){
            findItem.count = +findItem.count + 1
            cart[findCart].items.splice(findInd, 1, findItem)
        } else {
            return cart[findCart].items
        }
    }
    async decCount(id, tokenId){
        const findCart = cart.findIndex((elem)=> elem.id === tokenId)
        const findItem = cart[findCart].items.find((elem)=> elem.id === id)
        const findInd = cart[findCart].items.findIndex((elem) => elem.id === id)
        if(findInd>=0){
            if(+findItem.count > 1){
            findItem.count = +findItem.count - 1
            cart[findCart].items.splice(findInd, 1, findItem)
            }else {
                cart[findCart].items.splice(findInd, 1)
            }
        } else {
            return cart[findCart].items
        }
    }
    async getCart(tokenId){
        const findIndex = cart.findIndex((elem) => elem.id === tokenId)
        if(findIndex >=0) {
            return cart[findIndex]
        } else {
            return cart
        }
   
    }

}
module.exports = new CartService()