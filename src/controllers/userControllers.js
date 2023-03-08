const { getCartProductsServices, addToCartServices, registerServices } = require('../services/userServices');

const getCartProductsControllers = async (req, res) => {
    try {
        const { username } = req.body.user;
        const products = await getCartProductsServices(username);
        if (!products) return res.status(404).json({ message: 'No products found' });
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const addToCartControllers = async (req, res) => {
    try {
        const { username } = req.body.user;
        const { product } = req.body;
        const products = await addToCartServices(username, product);
        if (!products) return res.status(404).json({ message: 'No products found' });
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const registerControllers = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await registerServices(username, password, role);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

module.exports = {
    getCartProductsControllers,
    addToCartControllers,
    registerControllers,
}