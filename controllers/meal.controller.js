const catchAsync = require("../utils/catchAsync")


exports.newMeal = catchAsync( async(req, res, next) => {

    const {name, price, restaurantId } = req.body;
  

  const newMeal = await Meals.create({
    restaurantId,
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'Meal created successfully',
    newMeal

  });
});

   
exports.getMeal = catchAsync( async(req, res, next) => {

    const findMeal = await Meal.findAll({
        where: {
          status: true
        },
        include: [
          {
            model: Restaurants
          }
        ]
      });
    
      res.status(200).json({
        status: 'success',
        message: 'The meals was found successfully',
        findMeal
      });
    });


exports.getMealById = catchAsync( async(req, res, next) => {
    const {id} = req.params;



    const findMeal = await Meal.findOne({
      where: {
        id,
        status: true
      },
      include: [
        {
          model: Restaurants
        }
      ]
    });
  
  if(!findMeal){
      return next(new AppError('The meal could not found'))
    };
  
  
    
  
    res.status(200).json({
      status: 'success',
      message: 'The meal was found successfully',
      findMeal,
    });
  });


exports.updateMeal = catchAsync( async(req, res, next) => {
    const {id} = req.params;
    const {name, price} = req.body;
  
    const findMeal = await Meals.findOne({
      where: {
        id,
        status: true
      }
    });
  
    if(!findMeal){
      return next(new AppError('The meal could not found'))
    };
  
    const updateMeal = await findMeal.update({
      name,
      price
    })
  
    res.status(200).json({
      status: 'success',
      message: 'Meal updated successfully',
      updateMeal,
    })
  })


exports.deleteMeal = catchAsync( async(req, res, next) => {
    const {id} = req.params;

    const findMeal = await Meals.findOne({
      where: {
        id,
        status: true
      }
    });
  
    if(!findMeal){
      return next(new AppError('The meal could not found'))
    };
  
    const eliminateMeal = await findMeal.update({status: false})
  
    res.status(200).json({
      status: 'success',
      message: 'Meal eliminated successfully',
      deleteMeal
    });
  });
