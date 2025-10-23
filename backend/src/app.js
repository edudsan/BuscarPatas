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
// Converte a string separada por vírgulas em um array e remove espaços em branco
const ENV_ALLOWED_URLS = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : [];

const VERCEL_PROJECT_NAME = 'buscar-patas-sistema-de-adocao-de-pets';

// REGEX: Permite qualquer link de "preview" do Vercel
// Ex: https://buscar-patas-sistema-de-adocao-de-pets-QUALQUERCOISA.vercel.app
const VERCEL_PREVIEW_REGEX = new RegExp(`^https://${VERCEL_PROJECT_NAME}-.*\\.vercel\\.app$`);

// 2. Define a lista final de origens permitidas
// Note que 'http://localhost:5173' e a URL de produção já estão na sua ENV_ALLOWED_URLS
const allowedOrigins = [
  // Espalha todos os domínios da variável de ambiente (já contendo localhost e produção)
  ...ENV_ALLOWED_URLS,
];


const corsOptions = {
  origin: (origin, callback) => {
    // 1. Permite requisições que não possuem 'origin' (Postman, scripts, etc.)
    // OU se a origem está na lista estática.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
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
  optionsSuccessStatus: 204 // Para navegadores mais antigos
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