import { Router } from 'express';
import { createAdotante, getAllAdotantes, getAdotantesSemAdocao, updateAdotante } from '../controllers/adotanteController.js';

const router = Router();

// Rota para listar pessoas que não adotaram
router.get('/sem-adocao', getAdotantesSemAdocao);

// Rotas existentes
router.post('/', createAdotante);
router.get('/', getAllAdotantes);

// Rota para atualização parcial
router.put('/:id', updateAdotante);

export default router;