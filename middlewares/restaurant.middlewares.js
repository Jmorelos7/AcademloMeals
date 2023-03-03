const Restaurant = require("../models/restaurant.model");
const catchAsync = require("../utils/catchAsync");


exports.validExistRestaurant = catchAsync(async (req, res, next) => {
const {id} = req.params;

const restaurant = await Restaurant.findOne({
    where: {
        id,
        status: true
    }
});

if(!restaurant) {
    return next(new AppError("Restaurant not found", 404));
};

req.restaurant = restaurant;
next()
})

exports.validExistRestaurantId = catchAsync(async (req, res, next) => {

    const {restaurantId} = req.params;

    const restaurant = await Restaurant.findOne({
        where: {
            id: restaurantId,
            status: true
        }
    });
    
    if(!restaurant) {
        return next(new AppError("Restaurant not found", 404));
    };
    
    req.restaurant = restaurant;
    next()
    })

