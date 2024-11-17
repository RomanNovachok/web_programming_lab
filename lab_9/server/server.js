const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 62448;

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Підключено до MongoDB");
  })
  .catch((err) => {
    console.error("Помилка підключення до MongoDB:", err.message);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Модель MongoDB
const productSchema = new mongoose.Schema({
  image_link: String, // Заміна на посилання на зображення
  name: String,
  description: String,
  price: Number,
  is_rented: Boolean,
  type: String,
});

const Product = mongoose.model("Product", productSchema, "products_catalog");

// Тестовий маршрут
app.get("/", (req, res) => {
  res.send("Сервер працює! 🟢");
});

app.get("/api/products", async (req, res) => {
    try {
      const { type, minPrice, maxPrice, searchQuery } = req.query;
  
      console.log("Параметри запиту:", { type, minPrice, maxPrice, searchQuery });
  
      const filter = {};
  
      if (type && type !== "all") {
        filter.type = type;
      }
  
      if (minPrice || maxPrice) {
        filter.price = {
          ...(minPrice ? { $gte: Number(minPrice) } : {}),
          ...(maxPrice ? { $lte: Number(maxPrice) } : {}),
        };
      }
  
      if (searchQuery) {
        filter.$or = [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ];
      }
  
      console.log("Фільтр запиту до MongoDB:", filter);
  
      const products = await Product.find(filter);
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Помилка сервера при отриманні продуктів:", error);
      res.status(500).json({ message: "Помилка сервера", error });
    }
  });
  
  

// API маршрут для оновлення стану is_rented
app.put("/api/products/:_id", async (req, res) => {
  try {
    const { _id } = req.params; // Використання _id
    const { is_rented } = req.body;

    // Перевірка існування продукту
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).json({ message: "Продукт не знайдено" });
    }

    // Оновлення поля is_rented
    product.is_rented = is_rented;
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера", error });
  }
});

// Маршрут для отримання конкретного продукту за id
app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Продукт не знайдено" });
    }
    res.status(200).json(product); // Повертаємо продукт
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера", error });
  }
});

// Запуск сервера
const server = app.listen(PORT, () => {
  const selectedPort = server.address().port;
  console.log(`Сервер запущено на http://localhost:${selectedPort}`);
});
