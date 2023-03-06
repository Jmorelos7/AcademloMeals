const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");


exports.getOrderByUser = catchAsync(async(req, res, next) => {

    const { sessionUser } = req;
  
    
  
    const user = await User.findOne({
      where: {
        id: sessionUser.id
      },
      include: [
        {
          model: Order,
          include: [
            {
              model: Meal,
              include: [
                {
                  model: Restaurants
                }
              ]
            }
          ]
        }
      ]
    });
  
    res.status(200).json({
      status: 'success',
      message: 'The orders was found successfully',
      user
    });
  });
  
  exports.newOrder = catchAsync(async(req, res, next) => {
  
    const {quantity, mealId} = req.body;
    const {sessionUser} = req;
  
    const findMeal = await Meal.findOne({
      where: {
        id: mealId,
        status: true
      },
    });
    
  if(!findMeal){
      return next(new AppError('The meal could not found'))
    };

    const totalPrice = findMeal.price * quantity;
  
    const newOrder = await Order.create({
      quantity,
      mealId: findMeal.id,
      userId: sessionUser.id,
      totalPrice
    });
  
    
    res.status(200).json({
      status: 'success',
      message: 'Order completed',
      newOrder: {
        id: newOrder.id,
        totalPrice: newOrder.totalPrice,
        mealId: newOrder.mealId,
        quantity: newOrder.quantity
      }
      
      
      
    });
  });
  
  exports.updateOrder = catchAsync(async(req, res, next) => {
  
    const {id} = req.params;
  
    const findOrder = await Order.findOne({
      where: {
        id,
        status: 'active'
      }
    });
  
    if(!findOrder){
      return next(new AppError('Order not found'))
    };
  
    const OrderCompleted = await findOrder.update({status: 'completed'})
  
    
    res.status(200).json({
      status: 'success',
      message: 'The order completed successfully',
      OrderCompleted
    });
  });
  
  exports.deleteOrder = catchAsync(async(req, res, next) => {
  
    const {id} = req.params;
  
    const findOrder = await Order.findOne({
      where: {
        id,
        status: 'active'
      }
    });
  
    if(!findOrder){
      return next(new AppError('Order not found'))
    };
  
    const OrderCompleted = await findOrder.update({status: 'cancelled'})
    
    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully',
      OrderCompleted
    });
  });