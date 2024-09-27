const sequelize = require('./Config/database');

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })
    .finally(() => {
        sequelize.close(); // Cierra la conexión
    });