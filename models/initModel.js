const Order = require('./order.model');
const Reviews = require('./reviews.model');
const User = require('./user.model');
const Restaurant = require('./restaurant.model');
const Meal = require('./meal.model');


const initModel = () => {

    User.hasMany(Order)
    Order.belongsTo(User)

    User.hasMany(Reviews)
    Reviews.belongsTo(User)

    Restaurant.hasMany(Reviews)
    Reviews.belongsTo(Restaurant)

    Restaurant.hasMany(Meal)
    Meal.belongsTo(Meal)

    Meal.hasMany(Order)
    Order.belongsTo(Meal)
}

module.exports = initModel;