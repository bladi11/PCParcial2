// Controllers/ProductController.js
const PerishableProduct = require('../Models/PerishableProduct');
const NonPerishableProduct = require('../Models/NonPerishableProduct');
const ProductFactory = require('../Factories/ProductFactory');

//Crear productos
const createProduct = async (req, res) => {
    const { type, data } = req.body;
    try {
        const product = ProductFactory.createProduct(type, data);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Obtener productos
const getProducts = async (req, res) => {
    try {
        const perishableProducts = await PerishableProduct.findAll();
        const nonPerishableProducts = await NonPerishableProduct.findAll();
        res.status(200).json({
            perishableProducts,
            nonPerishableProducts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

//Actualizar productos
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { type, data } = req.body;

    try {
        let product;
        if (type === 'perishable') {
            product = await PerishableProduct.findByPk(id);
        } else if (type === 'nonPerishable') {
            product = await NonPerishableProduct.findByPk(id);
        } else {
            throw new Error('Invalid product type');
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Actualizar los campos con los nuevos valores
        await product.update(data);
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Eliminar productos
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    try {
        let product;
        if (type === 'perishable') {
            product = await PerishableProduct.findByPk(id);
        } else if (type === 'nonPerishable') {
            product = await NonPerishableProduct.findByPk(id);
        } else {
            throw new Error('Invalid product type');
        }

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Eliminar el producto
        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
