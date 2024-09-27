// Models/NonPerishableProduct.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const NonPerishableProduct = sequelize.define('NonPerishableProduct', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    shelfLife: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = NonPerishableProduct;

