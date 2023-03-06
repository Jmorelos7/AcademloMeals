const {Router} = require('express');
const {check} = require('express-validator');
const { signup, updateUser, login } = require('../controllers/user.controller');
const { validUser, validPassword, validUserByEmail, protectAccountOwner, protect } = require('../middlewares/user.middleware');
const { signupValidations, validateFields, updateUserValidation } = require('../middlewares/validations.middlewares');


const router = Router();

router.post('/signup', signupValidations, validateFields, signup);

router.post(
    '/login',
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
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