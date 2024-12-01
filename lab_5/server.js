const express = require('express');
const mongoose = require("mongoose")
const app = express();
const path = require("path"); // Для роботи зі шляхами
const PORT = 5000;

const productRouter = require("./server/API/products/Router");

// Дозволяємо парсинг JSON
app.use(express.json());

// Статичні файли з папки "client"
app.use(express.static(path.join(__dirname, 'client')));


// Маршрут для кореневої сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html')); // Якщо ваш HTML файл у папці "client"
});

app.use("/api", productRouter);


let start = async () => {
    await mongoose.connect("mongodb+srv://romanihorovuch:NCpEwi6lVyUkZIdW@cluster0.dhxs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    console.log("DB connected :)")

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
// Запуск серверу

start()
