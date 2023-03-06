const {Router} = require('express');
const {check} = require('express-validator');
const { findRestaurant, findRestaurants, createReview, updateReview, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantById, deleteReview } = require('../controllers/restaurant.controller');
const { validExistRestaurant, validExistRestaurantId } = require('../middlewares/restaurant.middlewares');
const { validExistReview } = require('../middlewares/review.middleware');
const { protect, protectAccountOwner } = require('../middlewares/user.middleware');
const { validateFields, createReviewValidation, createRestaurantValidation } = require('../middlewares/validations.middlewares');


const router = Router();

router.use(protect)

router.post('/', createRestaurantValidation, validateFields, createRestaurant)

router.get('/', findRestaurants);

router.get('/:id', getRestaurantById)

router.patch('/:id', updateRestaurant)

router.delete('/:id', deleteRestaurant)


router.post('/reviews/:id', createReviewValidation, validateFields, validExistRestaurant, createReview)

router.patch('/reviews/:restaurantId/:id', 
createReviewValidation, 
validateFields, 
validExistRestaurantId, 
validExistReview,
protectAccountOwner, 
updateReview)

router.delete('/reviews/:restaurantId/:id', protect, deleteReview)

module.exports = {
    restaurantRouter: router,
};