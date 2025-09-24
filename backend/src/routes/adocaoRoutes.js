import { Router } from 'express';
import { createAdocao, getAllAdocoes } from '../controllers/adocaoController.js';

const router = Router();

router.post('/', createAdocao);
router.get('/', getAllAdocoes);

export default router;