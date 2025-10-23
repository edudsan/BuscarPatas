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
//  CONFIGURAÇÃO DE CORS PARA VERCEL/RENDER
// ------------------------------------------------------------------

// 1. Processa a variável de ambiente CLIENT_URL
// Converte a string separada por vírgulas em um array e REMOVE ESPAÇOS E CONVERTE PARA MINÚSCULAS
const ENV_ALLOWED_URLS = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim().toLowerCase())
  : [];

// O nome do seu projeto no Vercel (base para o Regex de previews)
const VERCEL_PROJECT_NAME = 'buscar-patas-sistema-de-adocao-de-pets';

// REGEX: Permite qualquer link de "preview" do Vercel
const VERCEL_PREVIEW_REGEX = new RegExp(`^https://${VERCEL_PROJECT_NAME}-.*\\.vercel\\.app$`);


const corsOptions = {
  origin: (origin, callback) => {
    // Se a requisição não tem 'origin' (ex: Postman ou mesmo scripts no mesmo domínio), permite.
    if (!origin) {
        return callback(null, true);
    }
    
    // Normaliza a string de origem que veio na requisição
    const normalizedOrigin = origin.trim().toLowerCase();

    // 1. Verifica se a origem está na lista de URLs permitidas (Variável de Ambiente)
    if (ENV_ALLOWED_URLS.includes(normalizedOrigin)) {
      callback(null, true);
    } 
    // 2. Verifica se a origem corresponde ao padrão de Preview do Vercel (Regex).
    else if (VERCEL_PREVIEW_REGEX.test(normalizedOrigin)) {
      callback(null, true);
    }
    // 3. Bloqueia qualquer outra origem não autorizada.
    else {
      // Loga o bloqueio no console do Render (para debug)
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