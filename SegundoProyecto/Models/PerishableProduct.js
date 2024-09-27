// Models/PerishableProduct.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const PerishableProduct = sequelize.define('PerishableProduct', {
    // tabla modificada agregando nuevos datos
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationDate: { 
        type: DataTypes.DATE,
        allowNull: false,
    },
    storageTemperature: {
        type: DataTypes.DECIMAL(5, 2),
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

module.exports = PerishableProduct;
