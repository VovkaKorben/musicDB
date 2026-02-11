import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pkg from '@prisma/client'; // Импортируем весь пакет как объект

const { PrismaClient } = pkg;

// Если .env файл на месте, аргументы в скобках не нужны
const prisma = new PrismaClient();

const app = express();

app.use(cors()); // Чтобы Vite мог достучаться до сервера
app.use(express.json());

// Тестовый роут, чтобы проверить, что всё работает
app.get('/test', async (req, res) => {
    try {
        const count = await prisma.style.count();
        res.json({ message: "Связь с базой установлена!", stylesCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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