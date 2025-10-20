import { Router } from 'express';

import { createAdocao, getAllAdocoes, updateAdocao, deleteAdocao} from '../controllers/adocaoController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { getMyAdocoes } from '../controllers/adocaoController.js';

const router = Router();

router.post('/', protect, createAdocao);
router.get('/', protect, isAdmin, getAllAdocoes);
router.patch('/:id', protect, isAdmin, updateAdocao);
router.delete('/:id', protect, isAdmin, deleteAdocao);
router.get('/me', protect, getMyAdocoes);

export default router;