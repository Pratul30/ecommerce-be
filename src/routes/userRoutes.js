const express = require('express');
const userRouter = express.Router();

const {getCartProductsControllers, addToCartControllers ,registerControllers, loginControllers} = require('../controllers/userControllers');
const {authServiceRegister, authServiceLogin, validate} = require('../../src/middlewares/authentication')

userRouter.post('/register',authServiceRegister, registerControllers);
userRouter.post('/login', authServiceLogin);
userRouter.get('/cart', validate, getCartProductsControllers);
userRouter.post('/cart',validate, addToCartControllers);

module.exports = userRouter;