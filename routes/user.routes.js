const {Router} = require('express');
const {check} = require('express-validator');
const { signup, updateUser, login } = require('../controllers/user.controller');
const { validUser, validPassword, validUserByEmail, protectAccountOwner, protect } = require('../middlewares/user.middleware');
const { signupValidations, validateFields, updateUserValidation } = require('../middlewares/validations.middlewares');


const router = Router();

router.post('/signup', signupValidations, validateFields, signup);

router.post(
    '/login',
    //loginValidations,
    validateFields,
    validUserByEmail,
    validPassword,
    login
)

router.use(protect);

router.patch('/id',
    updateUserValidation,
    validateFields, 
    validUser, 
    protectAccountOwner, 
    updateUser)

module.exports = {
    userRouter: router,
};