const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validations.middlewares");


const router = Router();


router.post('/signup',[
  check('name','The name most be mandatory').not().isEmpty(),
  check('email','The email most be mandatory').not().isEmpty(),
  check('email','The email most be a correct format').isEmail(),
  check('password','The password most be mandatory').not().isEmpty(),
  validateFields,
], createUser)


router.post('/login', [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
  validateFields,
],login )

module.exports = {
  authRouter: router, 
} 