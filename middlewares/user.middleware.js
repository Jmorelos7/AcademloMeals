
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');


exports.validUserByEmail = catchAsync(async (req, res, next) => {

const {email} = req.body;

const user = await User.findOne({
    where: {
        email,
        status: true
    },
})

if(!user){
    return next(new AppError('The user is not registred'), 401);
}

red.user = user;
next();

});

exports.validPassword = catchAsync(async (req, res, next) => {
    const {user} = req;
    const {password} = req.body;

    if(!(await bcrypt.compare(password, user.password))){
    return next(new AppError('Invalidad Credentials', 401));
    };

    next();

})

exports.protect = catchAsync(async (req, res, next) => {
    //1. Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access', 401)
      );
    }
  
    //2. verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );
  
    //3 check if user still exist
    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: true,
      },
    });
  
    if (!user) {
      return next(
        new AppError('The owner of this token it not longer available', 401)
      );
    }
    
    req.sessionUser = user;
    next();
  });

  exports.protectAccountOwner = catchAsync(async (req, res, next) => {
    const { user, sessionUser } = req;
  
    if (user.id !== sessionUser.id) {
      return next(new AppError('You do not own this account.', 401));
    }
  
    next();
  });

  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.sessionUser.role)) {
        return next(new AppError('Yuo do not have permission to perfom this action!', 403))
      }
      next()
    }
  }

  exports.validUser = catchAsync(async (req, res, next) => {

    const {id} = req.params;

    const user = await User.findOne({
      where:{
        id,
        status: true,
      },
      
  });

  if(!user){
    return next(new AppError('The user is not registred'), 404);
  }

  req.user = user;
  next();

})