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
//  CONFIGURAÇÃO DE CORS SEGURA
// ------------------------------------------------------------------

// 1. Processa a variável de ambiente CLIENT_URL
// Converte a string separada por vírgulas em um array e remove espaços em branco (trim)
const ENV_ALLOWED_URLS = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : [];

// O nome do seu projeto no Vercel (base para o Regex de previews)
const VERCEL_PROJECT_NAME = 'buscar-patas-sistema-de-adocao-de-pets';

// REGEX: Permite qualquer link de "preview" do Vercel
// Ex: https://buscar-patas-sistema-de-adocao-de-pets-XXXXX.vercel.app
// O pacote 'cors' aceita regex diretamente no array de origens.
const VERCEL_PREVIEW_REGEX = new RegExp(`^https://${VERCEL_PROJECT_NAME}-.*\\.vercel\\.app$`);


// 2. Cria a lista final de origens (Strings e Regex)
// Esta lista será passada diretamente para o middleware CORS
const allowedOrigins = [
    ...ENV_ALLOWED_URLS, // Deve incluir 'http://localhost:5173' e a URL de produção
    VERCEL_PREVIEW_REGEX // Inclui o Regex para os previews do Vercel
];


// Aplica o middleware CORS usando a lista de origens (strings e regex)
app.use(cors({
    origin: allowedOrigins, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204
}));


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
