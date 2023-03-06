const catchAsync = require("../utils/catchAsync");
const Reviews = require("../models/reviews.model");
const Restaurant = require("../models/restaurant.model");
const AppError = require("../utils/appError");



exports.createRestaurant = catchAsync(async(req, res, next) => {
    const {name, address, rating} = req.body;

    const restaurant =  await Restaurant.create({
        name,
        address,
        rating,
    });

    res.status(201).json({
       status: 'success',
        message: 'Restaurant created successfully',

    })
})

exports.findRestaurants = catchAsync(async(req, res, next) => {

    const restaurant = await Restaurant.findAll({
        where: {
            status: true,
        }
    });
     
    res.status(200).json({
        status: 'success',
        restaurant,
    })

})

exports.createReview = catchAsync(async(req, res, next) => {
    const {comment, rating} = req.body;
    const {restaurant, sessionUser} = req;

    const review = await Reviews.create({
        userId: sessionUser.id,
        comment,
        restaurantId: restaurant.id,
        rating
    });

    res.status(201).json({
        status: 'success',
        review
})
})

exports.updateReview = catchAsync(async(req, res, next) => {
    const {review} = req;

    const {comment, rating} = req.body;

    await review.update({
        comment,
        rating,
    });

    res.Restaurant.status(200).json({
    status: 'success',
    message: 'Review updated successfully',
    });

})


exports.getRestaurantById = catchAsync( async(req, res, next) => {
    const {id} = req.params

    const findRestaurant = await Restaurant.findOne({
        where: {
            id,
            status: true,
        },
        include: [
            {
                model: Reviews
            }
        ]
    })


    res.status(200).json({
        status: 'success',
        message: 'Restaurant found succefully',
        findRestaurant,
    })
})


exports.updateRestaurant = catchAsync( async(req, res, next) => {
   
   const {name, address} = req.body
   const {id} = req.params

   const findRestaurant = await Restaurant. findOne({

    where: {
        id,
        status: true
    }
   })

   if(!findRestaurant){
    return next(new AppError('Restaurant already exists', 400))

   }

   const upInfoRestauran = await findRestaurant.update({
    name,
    address,
    
   })

      
    res.status(200).json({
        status: 'success',
        message: 'Restaurant updated successfully',
        upInfoRestauran,
    })
})


exports.deleteRestaurant = catchAsync( async(req, res, next) => {

    const {id} = req.params

    const findRestaurant = await Restaurant.findOne({
        where: {
            id,
            status: true,
        }

    })

    if(!findRestaurant){
        return next(new AppError('Restaurant already exists', 400))

    }

    const restaurantDelete = await findRestaurant.update({
        statu: 'success'
    })


    res.status(200).json({
        status: 'success',
        message: 'Restaurant deleted successfully',
        restaurantDelete
    })
})


exports.deleteReview = catchAsync( async(req, res, next) => {

    const {comment, rating, restaurantId, userId} = req.body
    const {id} = req.params

    const findRestaurant = await Restaurant.findOne({
        where:{
            id,
            status: 'success'
        }
    })

    if(!findRestaurant){
        return next(new AppError('Restaurant already exists', 400))
    }
    const newReview = await Reviews.create({
        comment,
        rating,
        restaurantId,
        userId,
    })

    res.status(200).json({
        status: 'success',
        message: 'Review deleted successfully',
        newReview
    })
})