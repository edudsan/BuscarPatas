import { Router } from 'express';
import { 
  createAdotante, 
  getAllAdotantes, 
  getAdotantesSemAdocao,
  updateAdotante, 
  deleteAdotante
} from '../controllers/adotanteController.js';

const router = Router();

router.get('/sem-adocao', getAdotantesSemAdocao);
router.get('/', getAllAdotantes);

router.post('/', createAdotante);

router.patch('/:id', updateAdotante);

router.delete('/:id', deleteAdotante);

export default router;