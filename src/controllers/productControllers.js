const { getAllProductsServices, createProductServices } = require('../services/productServices');

const getAllProductsControllers = async (req, res) => {
    try {
        const products = await getAllProductsServices()
        if (!products) return res.status(404).json({ message: 'No products found' });
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

const createProductControllers = async (req, res) => {
    try{
    const { name } = req.body;
    const product = await createProductServices(name);
    res.status(200).json(product);
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

module.exports = {
    getAllProductsControllers,
    createProductControllers,
}