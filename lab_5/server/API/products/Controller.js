let Product = require("../../models/product");

class Controller {
    // Отримання всіх продуктів
    async getAll(req, res) {
        try {
            let products = await Product.find({});
            res.status(200).json({ status: 200, products: products });
        } catch (e) {
            console.error(`Error fetching products: ${String(e)}`); // Логування помилки
            res.status(500).json({ status: 500, message: `Internal server error: ${String(e)}` });
        }
    }
    


    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return res.status(404).json({ status: 404, message: "Продукт не знайдено" });
            }

            res.status(200).json({ status: 200, message: "Продукт успішно видалено" });
        } catch (e) {
            console.error(`Error deleting product: ${String(e)}`);  // Логування помилки
            res.status(500).json({ status: 500, message: `Internal server error: ${String(e)}` });
        }
    }


    // Controller.js
    async getProductById(req, res) {
        try {
            const { id } = req.params; // Отримуємо ID з параметрів
            const product = await Product.findById(id); // Знаходимо продукт за ID

            if (!product) {
                return res.status(404).json({ status: 404, message: "Продукт не знайдено" });
            }

            res.status(200).json({ status: 200, product });
        } catch (e) {
            console.error(`Error fetching product: ${String(e)}`);
            res.status(500).json({ status: 500, message: `Internal server error: ${String(e)}` });
        }
    }


    // Створення нового продукту
    async createProduct(req, res) {
        try {
            const { name, description, priceInGrn, imageLink } = req.body;
            console.log(name, description, priceInGrn, imageLink)

            // Валідація
            if (!name || !description || !priceInGrn || !imageLink) {
                return res.status(400).json({ status: 400, message: "Всі поля повинні бути заповнені" });
            }

            if (isNaN(priceInGrn)) {
                return res.status(400).json({ status: 400, message: "Ціна повинна бути числом" });
            }

            let newProduct = new Product({
                name,
                description,
                priceInGrn,
                imageLink
            });

            await newProduct.save();

            res.status(201).json({ status: 201, message: "Продукт успішно створено", product: newProduct });
        } catch (e) {
            console.error(`Error creating product: ${String(e)}`);  // Логування помилки
            res.status(500).json({ status: 500, message: `Internal server error: ${String(e)}` });
        }
    }

    // Оновлення продукту за ID
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, priceInGrn, imageLink } = req.body;

            // Валідація
            if (!name || !description || !priceInGrn || !imageLink) {
                return res.status(400).json({ status: 400, message: "Всі поля повинні бути заповнені" });
            }

            if (isNaN(priceInGrn)) {
                return res.status(400).json({ status: 400, message: "Ціна повинна бути числом" });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, {
                name,
                description,
                priceInGrn,
                imageLink
            }, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({ status: 404, message: "Продукт не знайдено" });
            }

            res.status(200).json({ status: 200, message: "Продукт успішно оновлено", product: updatedProduct });
        } catch (e) {
            console.error(`Error updating product: ${String(e)}`);  // Логування помилки
            res.status(500).json({ status: 500, message: `Internal server error: ${String(e)}` });
        }
    }

    
}

module.exports = new Controller();
