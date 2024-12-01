// Router.js
const { Router } = require("express"); 
const controller = require("./Controller");

const router = new Router();

// Маршрут для отримання всіх продуктів
router.get('/products', controller.getAll);

// Маршрут для отримання продукту за ID
router.get('/products/:id', controller.getProductById);

// Маршрут для створення нового продукту
router.post('/products', controller.createProduct);

// Маршрут для оновлення продукту
router.put('/products/:id', controller.updateProduct);

router.delete('/products/:id', controller.deleteProduct);


module.exports = router;
