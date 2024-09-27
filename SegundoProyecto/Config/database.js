const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('products_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        // Especifica el charset correcto
        charset: 'utf8mb4',  // Utiliza utf8mb4 para una mejor compatibilidad
    },
    logging: false // Opcional: desactiva el logging si no necesitas ver las consultas SQL
});

module.exports = sequelize;
