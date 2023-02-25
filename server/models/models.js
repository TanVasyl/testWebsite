const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    login: {type: DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})
const Basket_food = sequelize.define('basket_food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    count: {type: DataTypes.INTEGER, defaultValue: 1},
})
const Food = sequelize.define('food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    price: {type: DataTypes.INTEGER, allowNull:false},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    Image: {type: DataTypes.STRING, allowNull:false},

})
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    rate: {type:DataTypes.INTEGER, allowNull:false}
})
const Food_info = sequelize.define('food_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    description: {type:DataTypes.STRING, allowNull:false},
    title: {type:DataTypes.STRING,allowNull:false}
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(Basket_food)
Basket_food.belongsTo(Basket)

Food.hasMany(Basket_food)
Basket_food.belongsTo(Food)

Food.hasMany(Rating)
Rating.belongsTo(Food)

Food.hasMany(Food_info, {as: 'info'})
Food_info.belongsTo(Food)

Type.hasMany(Food)
Food.belongsTo(Type)

module.exports = {
    User,
    Basket,
    Basket_food,
    Food,
    Type,
    Rating,
    Food_info,
}