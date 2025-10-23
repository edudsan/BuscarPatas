import dotenv from 'dotenv'; 
dotenv.config();

import express from 'express';
import cors from 'cors';

// Importação das rotas
import authRoutes from './routes/authRoutes.js'; 
import petRoutes from './routes/petRoutes.js';
import adotanteRoutes from './routes/adotanteRoutes.js'; 
import adocaoRoutes from './routes/adocaoRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import passport from './config/passport.js'; 
import dashboardRoutes from './routes/dashboardRoutes.js';


const app = express();

// ------------------------------------------------------------------
//  CONFIGURAÇÃO DE CORS PARA VERCEL/RENDER
// ------------------------------------------------------------------

// URL de Produção/Principal
const PRODUCTION_URL = 'https://buscar-patas-sistema-de-adocao-de-p.vercel.app'; 

// REGEX: Permite qualquer link de "preview" do Vercel que comece com o nome do projeto.
// Ex: https://buscar-patas-sistema-de-adocao-de-pets-QUALQUERCOISA.vercel.app
const VERCEL_PREVIEW_REGEX = /^https:\/\/buscar-patas-sistema-de-adocao-de-pets-.*\.vercel\.app$/;

const allowedOrigins = [
  'http://localhost:3000', // Ambiente de desenvolvimento local
  PRODUCTION_URL,          // Domínio principal 
  process.env.CLIENT_URL   // Variável de ambiente configurada no Render
];

const corsOptions = {
  origin: (origin, callback) => {
    // 1. Permite requisições que não possuem 'origin' (Postman, scripts, etc.)
    // OU se a origem está na lista estática (localhost, produção).
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } 
    // 2. Verifica se a origem corresponde ao padrão de Preview do Vercel (Regex).
    else if (VERCEL_PREVIEW_REGEX.test(origin)) {
      callback(null, true);
    }
    // 3. Bloqueia qualquer outra origem não autorizada.
    else {
      console.error(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS policy.')); 
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(passport.initialize());

// Rotas
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/profile', profileRoutes);
app.use('/pets', petRoutes);
app.use('/adotantes', adotanteRoutes); 
app.use('/adocoes', adocaoRoutes);
app.use('/dashboard', dashboardRoutes);

export default app;