import express from 'express';

import petRoutes from './routes/petRoutes.js';
import adotanteRoutes from './routes/adotanteRoutes.js';
import adocaoRoutes from './routes/adocaoRoutes.js';

const app = express();

// Middleware para entender JSON
app.use(express.json());

// Definindo as rotas base da API
app.use('/pets', petRoutes);
app.use('/adotantes', adotanteRoutes);
app.use('/adocoes', adocaoRoutes);

export default app;