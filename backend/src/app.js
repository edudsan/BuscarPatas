import express from 'express';
import authRoutes from './routes/authRoutes.js'; 
import petRoutes from './routes/petRoutes.js';
import adotanteRoutes from './routes/adotanteRoutes.js';
import adocaoRoutes from './routes/adocaoRoutes.js';
import cors from 'cors'; 

const app = express();

// Middleware para entender JSON
app.use(express.json());

app.use(cors());

app.use('/auth', authRoutes);

// Definindo as rotas base da API
app.use('/pets', petRoutes);
app.use('/adotantes', adotanteRoutes);
app.use('/adocoes', adocaoRoutes);

export default app;