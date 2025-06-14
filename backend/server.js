import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';

dotenv.config();
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configurado via variável de ambiente
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use('/api', authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
