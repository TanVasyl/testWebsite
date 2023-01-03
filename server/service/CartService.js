const cart = require('./cartBD/cart.json')
const cartPath = __dirname + '/cartBD/cart.json'
const fs = require('fs')


class CartService {
    async addItem(item){
        if(cart.find((elem) => elem.id === item.id)){
            return cart
        } else {
            cart.push(item)
            fs.writeFile(cartPath, JSON.stringify(cart), (err,data) => {
                err ? console.log(err) : console.log('cart update')})}
        
    }
    async removeItem(id){
        const findItem = cart.find((elem)=> elem.id === id)
        const findInd = cart.findIndex((elem) => elem.id === id)
        if(findInd>=0){
        cart.splice(findInd,1)
        fs.writeFile(cartPath, JSON.stringify(cart), (err,data) => {
            err ? console.log(err) : console.log('cart update')})
        } else {
            return cart
        }
    }
    async incCount(id){
        const findItem = cart.find((elem)=> elem.id === id)
        const findInd = cart.findIndex((elem) => elem.id === id)
        if(findInd>=0){
            findItem.count =+ findItem.count + 1
            cart.splice(findInd, 1, findItem)
        } else {
            return cart
        }
    }
    async decCount(id){
        const findItem = cart.find((elem)=> elem.id === id)
        const findInd = cart.findIndex((elem) => elem.id === id)
        if(findInd>=0){
            if(+findItem.count > 1){
            findItem.count = +findItem.count - 1
            cart.splice(findInd, 1, findItem)
            }else {
                cart.splice(findInd, 1)
            }
        } else {
            return cart
        }
    }
    async getCart(){
        console.log(cart);
        return cart
    }

}
module.exports = new CartService()