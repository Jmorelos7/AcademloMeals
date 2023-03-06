const {Router} = require('express');
const {check} = require('express-validator');
const { newMeal, getMeal, getMealById, updateMeal, deleteMeal } = require('../controllers/meal.controller');
const { protect, restrictTo } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validations.middlewares');


const router = Router();

router.post('/',[ 
check('name', 'The name most be mandatory').not().isEmpty(),
check('price', 'The price most be mandatory').not().isEmpty(),
check('price', 'The price most be s correct format').isNumeric(),
validateFields,
],  protect, restrictTo('admin'), newMeal)

router.get('/', getMeal)

router.get('/:id', getMealById)

router.patch('/:id', protect, restrictTo('admin'), updateMeal)

router.delete('/:id', protect, restrictTo('admin'), deleteMeal)





module.exports = {
    mealRouter: router,
};