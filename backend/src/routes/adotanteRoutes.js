import { Router } from 'express';
import { 
  createAdotante, 
  getAllAdotantes, 
  getAdotantesSemAdocao,
  updateAdotante, 
  deleteAdotante
} from '../controllers/adotanteController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js'; 


const router = Router();

router.get('/sem-adocao', protect, isAdmin, getAdotantesSemAdocao);
router.get('/', protect, isAdmin, getAllAdotantes);
router.post('/', protect, isAdmin, createAdotante);
router.patch('/:id', protect, isAdmin, updateAdotante);
router.delete('/:id', protect, isAdmin, deleteAdotante);

export default router;