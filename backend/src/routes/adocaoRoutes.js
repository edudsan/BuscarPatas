import { Router } from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { createAdocao, getAllAdocoes, getMyAdocoes, updateAdocao, deleteAdocao,adminCreateAdocao} from '../controllers/adocaoController.js';

const router = Router();

// --- ROTAS DO USUÁRIO LOGADO ---
router.post('/', protect, createAdocao);
router.get('/me', protect, getMyAdocoes);

// --- ROTAS DE ADMIN ---
router.get('/', protect, isAdmin, getAllAdocoes);
router.patch('/:id', protect, isAdmin, updateAdocao); // PATCH - admin atualiza uma adoção
router.delete('/:id', protect, isAdmin, deleteAdocao);
router.post('/admin', protect, isAdmin, adminCreateAdocao);


export default router;