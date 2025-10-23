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
//  CONFIGURAÇÃO DE CORS PARA TESTE (PERMITE TUDO - INSEGURO)
// ------------------------------------------------------------------

app.use(cors({
    origin: '*', 
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