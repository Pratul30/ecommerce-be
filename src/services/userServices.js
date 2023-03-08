const { Users, Carts, Products } = require('../../database/models');
const { v4: uuidv4 } = require('uuid');

const getCartProductsServices = async (username) => {
    try {
        const user = await Users.findOne({ where: { username } });
        if(!user){
            throw new Error('User not found');
        }
        const productsIdArray = await Carts.findOne({ where: { cartId: user.cartId } });
        const products = await Products.findAll({ where: { productId: productsIdArray } });
        return products;
    } catch (err) {
        throw new Error(err);
    }
}

const addToCartServices = async (username, products) => {
    try {
        const user = await Users.findOne({ where: { username } });
        const productsIdArray = []
        for(const product of products){
            const productInCart = await Products.findOne({ where: { name: product.name } });
            productsIdArray.push(productInCart.productId);
        }
        const cart = await Carts.create({ cartId: uuidv4(),products: productsIdArray });
        await Users.update({ cartId: cart.cartId }, { where: { username: user.username } });
        return cart;
    } catch (err) {
        throw new Error(err);
    }
}

const registerServices = async (username, password, role) => {
    try {
        const user = await Users.create({ username});
        return user;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getCartProductsServices,
    addToCartServices,
    registerServices
}