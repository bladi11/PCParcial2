// Routes/productRoutes.js
const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../Controllers/ProductController');
const router = express.Router();

// Ruta para crear productos
router.post('/create', createProduct);
// Ruta para obtener productos
router.get('/obtener', getProducts);
//Ruta para actualizar productos
router.put('/update/:id', updateProduct);
//Ruta para eliminar productos
router.delete('/delete/:id', deleteProduct);


module.exports = router;
