const uuid = require('uuid')
const path = require('path')
const {Food, Food_info} = require('../models/models')
const ApiError = require('../error/APIError')

class FoodControler {
    
    async create(req,res, next) {
      try {
        let {name, price, info, typeId} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.join(__dirname , '..' , "/static", fileName))
        const food = await Food.create({name, price, typeId, Image:fileName}) 
        if(info) {  
            info = JSON.parse()
            info.forEach(i => 
                Food_info.create({
                    title: i.title,
                    description: i.description,
                    foodId: food.id
                }))
        }
        res.json(food)

      } catch (error) {
        next(ApiError.BadRequest(error.message))
      }
    }
    async getAll(req,res) {
        let {typeId, limit, page} = req.query
        limit = limit || 6
        page = page || 1
        let offset = limit*page - limit
        let food;
        if(!typeId) {
            food = await Food.findAndCountAll({limit, offset})
       
        } else {
            food = await Food.findAndCountAll({where:{typeId}, limit, offset})
        }
       return res.json(food)
    }
    async getOne(req,res) {
        const {id} = req.params
        const food = await Food.findOne(
            {
                where: {id},
                include:[{model: Food_info, as: 'info'}]
            }
        )
        return res.json(food)
    }

}

module.exports = new FoodControler()