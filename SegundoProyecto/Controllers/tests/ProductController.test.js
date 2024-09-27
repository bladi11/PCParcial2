const request = require('supertest');
const app = require('../../index');  
const sequelize = require('../../Config/database');
const PerishableProduct = require('../../Models/PerishableProduct');
const NonPerishableProduct = require('../../Models/NonPerishableProduct');

beforeAll(async () => {
    // Sincroniza la base de datos antes de ejecutar las pruebas
    await sequelize.sync();
});

afterAll(async () => {
    // Cierra la conexión con la base de datos después de las pruebas
    await sequelize.close();
});

describe('CRUD Product Tests', () => {

    // Prueba para crear un producto perecedero
    it('should create a perishable product', async () => {
        const response = await request(app)
            .post('/api/products/create')
            .send({
                type: 'perishable',
                data: {
                    name: 'Milk',
                    expirationDate: '2024-10-10',
                    storageTemperature: 4.0,
                    category: 'Dairy',
                    brand: 'Brand A',
                    stock: 50,
                    price: 1.99,
                    supplier: 'Supplier A',
                    barcode: '1234567890123'
                }
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.product.name).toBe('Milk');
    });

    // Prueba para crear un producto no perecedero
    it('should create a non-perishable product', async () => {
        const response = await request(app)
            .post('/api/products/create')
            .send({
                type: 'nonPerishable',
                data: {
                    name: 'Canned Beans',
                    shelfLife: 24,
                    category: 'Canned Goods',
                    brand: 'Brand B',
                    stock: 100,
                    price: 2.99,
                    supplier: 'Supplier B',
                    barcode: '9876543210987'
                }
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.product.name).toBe('Canned Beans');
    });

    // Prueba para obtener todos los productos
    it('should get all products', async () => {
        const response = await request(app).get('/api/products/obtener');
        expect(response.statusCode).toBe(200);
        expect(response.body.perishableProducts).toBeDefined();
        expect(response.body.nonPerishableProducts).toBeDefined();
    });

    // Prueba para actualizar un producto no perecedero
    it('should update a non-perishable product', async () => {
        const product = await NonPerishableProduct.create({
            name: 'Rice',
            shelfLife: 12,
            category: 'Grains',
            brand: 'Brand C',
            stock: 50,
            price: 1.50,
            supplier: 'Supplier C',
            barcode: '1111111111111'
        });

        const response = await request(app)
            .put(`/api/products/update/${product.id}`)
            .send({
                type: 'nonPerishable',
                data: {
                    name: 'Rice Updated',
                    shelfLife: 18,
                    category: 'Grains',
                    brand: 'Brand D',
                    stock: 100,
                    price: 1.75,
                    supplier: 'Supplier D',
                    barcode: '2222222222222'
                }
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.product.name).toBe('Rice Updated');
    });

    // Prueba para eliminar un producto perecedero
    it('should delete a perishable product', async () => {
        const product = await PerishableProduct.create({
            name: 'Yogurt',
            expirationDate: '2024-10-10',
            storageTemperature: 5.0,
            category: 'Dairy',
            brand: 'Brand A',
            stock: 50,
            price: 2.50,
            supplier: 'Supplier A',
            barcode: '1234567890123'
        });

        const response = await request(app)
            .delete(`/api/products/delete/${product.id}`)
            .send({ type: 'perishable' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Product deleted successfully');
    });
});
