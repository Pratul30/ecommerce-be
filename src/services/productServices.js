const {Products} = require('../../database/models');
const { v4: uuidv4 } = require('uuid');

const getAllProductsServices = async () => {
    try{
    const products = await Products.findAll();
    return products;
    } catch (err) {
        throw new Error(err);
    }
}

const createProductServices = async (name) => {
    try{
    const productId = uuidv4();
    const product = await Products.create({ name, productId });
    return product;
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {
    getAllProductsServices,
    createProductServices,
}
