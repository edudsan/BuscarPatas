import { Router } from 'express';
import { createAdotante, getAllAdotantes } from '../controllers/adotanteController.js';

const router = Router();

router.post('/', createAdotante);
router.get('/', getAllAdotantes);

export default router;