const {validationResult, check} = require('express-validator');


exports.validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    next();

}

exports.signupValidations = [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must have a correct format').not().isEmpty(),
    check('Password', 'Password is required').not().isEmpty(),
]

exports.loginValidation = [
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must have a correct format').not().isEmpty(),
    check('Password', 'Password is required').not().isEmpty(),
]

exports.updateUserValidation = [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email must have a correct format').not().isEmpty(),
]

exports.createRestaurantValidation = [
    check('name', 'The name is required').not().isEmpty(),
    check('address', 'The address is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),
    check('rating', 'The rating is must be numeric').isNumeric(),
]

exports.createReviewValidation = [
    check('comment', 'The comment is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),
    check('rating', 'The rating is must be numeric').isNumeric(),
]