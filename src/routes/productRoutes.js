const express = require('express')
const productRouter = express.Router();

const {getAllProductsControllers, createProductControllers} = require('../controllers/productControllers')
const {validate} = require('../middlewares/authentication')

productRouter.get('/',validate, getAllProductsControllers)
productRouter.post('/',validate, createProductControllers)

module.exports = productRouter