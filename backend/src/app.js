// backend/src/app.js

// Carrega as variáveis de ambiente PRIMEIRO
import dotenv from 'dotenv'; 
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from './config/passport.js'; // Importa a configuração do Passport
import authRoutes from './routes/authRoutes.js'; 
import petRoutes from './routes/petRoutes.js';
import adotanteRoutes from './routes/adotanteRoutes.js'; 
import adocaoRoutes from './routes/adocaoRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js'; 

const app = express();

const frontendURL = process.env.FRONTEND_URL; 

// Define as origens permitidas
const allowedOrigins = [
  'http://localhost:5173' // Para desenvolvimento local
];
if (frontendURL) {
  allowedOrigins.push(frontendURL); // Adiciona a URL de produção se estiver definida
}

// Define as opções do CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (como apps mobile ou curl) OU se a origem está na lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  credentials: true, // Permite envio de cookies/cabeçalhos de autorização
  optionsSuccessStatus: 204 // Para requisições pre-flight (OPTIONS)
};

app.use(cors(corsOptions)); // Aplica as opções configuradas
// -----------------------------------------

app.use(express.json()); // Middleware para parsear JSON
app.use(passport.initialize()); // Inicializa o Passport

// Rotas da API
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/profile', profileRoutes);
app.use('/pets', petRoutes);
app.use('/adotantes', adotanteRoutes); 
app.use('/adocoes', adocaoRoutes);
app.use('/dashboard', dashboardRoutes); 

// Middleware simples para tratar rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Middleware para tratamento de erros genéricos (opcional, mas bom ter)
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err.stack);
  res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
});

export default app;