const {Router} = require('express');
const {check} = require('express-validator');
const { newOrder, updateOrder, deleteOrder, getOrderByUser } = require('../controllers/order.controller');
const { protect, protectAccountOwner } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validations.middlewares');


const router = Router();

router.use(protect)

router.post('/', validateFields, newOrder)

router.get('/me', getOrderByUser)

router.patch('/:id',  protectAccountOwner, updateOrder)

router.delete('/:id',  protectAccountOwner, deleteOrder)



module.exports = {
    orderRouter: router,
};