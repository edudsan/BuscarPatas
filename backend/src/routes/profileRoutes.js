import { Router } from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Todas as rotas aqui são protegidas, exigem login
router.get('/me', protect, getMyProfile);
router.patch('/me', protect, updateMyProfile);

export default router;