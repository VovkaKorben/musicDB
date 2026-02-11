import express from 'express';
import cors from 'cors';
import pkg from '@prisma/client'; // Импортируем весь пакет как объект

const { PrismaClient } = pkg;    // Достаем PrismaClient из объекта
const prisma = new PrismaClient();

const app = express();

app.use(cors()); // Чтобы Vite мог достучаться до сервера
app.use(express.json());

// Пример: получение всех стилей
app.get('/api/styles', async (req, res) => {
    const styles = await prisma.style.findMany();
    res.json(styles);
});

// Пример: создание стиля (для админа)
app.post('/api/styles', async (req, res) => {
    const { name } = req.body;
    const newStyle = await prisma.style.create({ data: { name } });
    res.json(newStyle);
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));