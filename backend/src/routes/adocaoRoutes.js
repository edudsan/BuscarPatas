import { Router } from 'express';

import { createAdocao, getAllAdocoes, updateAdocao, deleteAdocao} from '../controllers/adocaoController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, isAdmin, createAdocao);
router.get('/', protect, isAdmin, getAllAdocoes);
router.patch('/:id', protect, isAdmin, updateAdocao);
router.delete('/:id', protect, isAdmin, deleteAdocao);

export default router;